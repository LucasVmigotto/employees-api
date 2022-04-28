const config = require('./config')
const createApp = require('./app')

const {
  httpServer,
  logger
} = createApp(config)

const close = async () => {

  if (close.closed) {

    return

  }

  close.closed = true

  logger.info('Server closing...')

  await new Promise(resolve => httpServer.close(resolve))

  logger.info('Server Closed')

  process.exit()

}

httpServer.on('error', err => {

  logger.error(err)

  if (err.code === 'EADDRINUSE') {

    close()

  }

})

httpServer.listen(
  {
    port: config.API_PORT,
    host: config.API_HOST
  },
  () => {

    logger.info(`Server ready at http://${config.API_HOST}:${config.API_PORT}`)
  }
)

process.once('SIGINT', close)
process.once('SIGTERM', close)
