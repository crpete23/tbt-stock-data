const express = require('express')
const app = express()
const { PORT = 3200, NODE_ENV = 'development' } = process.env

if (NODE_ENV === 'development') {
  app.use(require('morgan')('dev'))
}

app.use(require('body-parser').json())
app.use(require('cors')())

app.use('/api/applMonthlyClosingData', require('./routes/applMonthlyClosingData'))

app.use('/', (req, res) => res.send({
  server:{
    name: 'Coding Challenge Server',
    apiVersion: '0.2'
  },
  availableDataSeries: {
  applMonthlyClosingData: {
    name: 'Monthly Apple Stock Closing Data',
    description: 'Apple stock closing price data for the last month'
  }
}
}))

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`

  next({ status, error })
})

app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)

  const message = `Something went wrong.`
  const { status = 500, error = message } = err

  res.status(status).json({ status, error })
})

if (NODE_ENV !== 'testing') {
  const listener = () => console.log(`Listening on port ${PORT}!`)
  app.listen(PORT, listener)
}

module.exports = app
