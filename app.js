const express = require('express')
const cors = require('cors')({ origin: true, credentials: true })
const responseTime = require('response-time')
const cookieParser = require('cookie-parser')
require('format-unicorn')

const app = express()
app.use(cors)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(responseTime({ suffix: false, digits: 0 }))

/* Middlewares */
const callLoggerMiddleware = require('./middlewares/call-logger.middleware')
const errorLoggerMiddleware = require('./middlewares/error-logger.middleware')
const listMiddleware = require('./middlewares/list.middleware')

app.use(callLoggerMiddleware)
app.use(listMiddleware)

const statusRoutes = require('./routes/status.routes')
const allRoutes = require('./routes/all.routes')

app.use('/', statusRoutes)
app.use('/', allRoutes)

app.use(errorLoggerMiddleware)

module.exports = app
