const Octokit = require('@octokit/rest')
const memjs = require('memjs')
const config = require('../../config/config')

const octokit = new Octokit({
  auth: config.token
})

const memcache = memjs.Client.create(process.env.MEMCACHE_SERVER)

exports.list = async (req, res) => {
  const [ owner, repo ] = (req.query.target || '').split('/')

  if (!owner || !repo) {
    res.status(400).send('Bad request')
    return
  }

  const { value } = await memcache.get(`${owner}/${repo}`)

  if (value) {
    res.send(value.toString())
    return
  }

  octokit.repos.listCommits({
    owner,
    repo,
    per_page: 100
  }).then(({ data }) => {
    const messages = data.map(a => a.commit.message)
    const messagesWithoutMerge = messages.filter(a => !a.startsWith('Merge pull request'))

    memcache.set(`${owner}/${repo}`, JSON.stringify(messagesWithoutMerge), { expires: process.env.MEMCACHE_EXPIRE_SECONDS })

    res.send(messagesWithoutMerge)
  }).catch(error => {
    if (error.status === 404) {
      res.status(404).send('Not found')
    } else {
      res.status(500).send('Internal Server Error')
    }
  })
}
