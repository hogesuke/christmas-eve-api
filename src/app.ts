const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const commit = require('./models/commit')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'))

app.get('/commits', commit.list)

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
