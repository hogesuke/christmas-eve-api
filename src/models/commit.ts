const Octokit = require('@octokit/rest');
const config = require('../../config/config');

const octokit = new Octokit({
  auth: config.token
});

exports.list = (req, res) => {
  const [ owner, repo ] = (req.query.target || '').split('/')

  if (!owner || !repo) {
    res.status(400).send('Bad request')
    return
  }

  octokit.repos.listCommits({
    owner,
    repo
  }).then(({ data }) => {
    const messages = data.map(a => a.commit.message)
    const messagesWithoutMerge = messages.filter(a => !a.startsWith('Merge pull request'))

    res.send(messagesWithoutMerge)
  }).catch(error => {
    if (error.status === 404) {
      res.status(404).send('Not found')
    } else {
      res.status(500).send('Internal Server Error')
    }
  })
}
