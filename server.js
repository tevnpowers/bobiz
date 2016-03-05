import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from './config/logger'
let env = process.env.NODE_ENV || 'development'
import global from './config/config'
let config = './config/config'[env]
import util from './util'

logger.info('environment: ' + env)

let app = express()

// general app configuration
app.use(util.allowCrossDomain)
app.use(cookieParser())
app.use(bodyParser.json())

logger.info('allowing origin: ' + JSON.stringify(global.corsAllowOrigin))

require('./config/routes')(app)

app.listen(config.port, function() {
  logger.log('info', 'environment: ' + env)
  logger.log('info', 'server started on port ' + config.port)
})

module.exports = app