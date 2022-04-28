const { sign } = require('jsonwebtoken')
const contraints = require('./constraints')

/**
 *
 * Function that mount and return
 * a response to the request where
 * was used
 *
 * @param {object} response
 * @param {number} code
 * @param {object} payload
 * @returns The express response to the related
 * request
 */
const makeResponse = (response, code = 201, payload = {}) => response
  .status(code)
  .send({ ...payload })

/**
 *
 * Function that sign a token with
 * the given data as paylaod and
 * with the issuer, secret and expire
 * time
 *
 * @param {obj} data
 * @param {string} jwtIssuer
 * @param {string} jwtSecret
 * @param {string} jwtExpires
 * @returns {string} The signed token
 * with the given data as payload
 */
const signJWT = (data, jwtIssuer, jwtSecret, jwtExpires) => sign(
  data,
  jwtSecret,
  {
    issuer: jwtIssuer,
    expiresIn: jwtExpires
  }
)

module.exports = {
  ...contraints,
  makeResponse,
  signJWT
}
