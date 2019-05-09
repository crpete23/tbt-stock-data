const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const controller = require('./controller')
const model = require('./model')

app.use(cors())

// Sets up enviroment variables for config
require('dotenv').config();

// Defines attribution logo
app.use('/logo.png', express.static(__dirname + '/logo.png'))

app.get('/', controller.baseRoute)
app.get('/api/:series', controller.checkSeries)

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`
  console.log(error)
  next({ status, error })
})

app.use((err, req, res, next) => {
  const message = `Something went wrong.`
  const { status = 500, error = message } = err
  console.log(err)
  res.status(status).json({ status, error })
})

app.listen(port, function() {
  console.log(`App started running on port ${port}`)
  setInterval(model.clearCache, 3600000)
})

module.exports = app
