const { createLogger } = require('./logger')
const { createKnex } = require('./knex')

exports.createContext = config => {
  const logger = createLogger({ config })

  const knex = createKnex({ config, logger })

  return {
    logger,
    knex
  }
}
