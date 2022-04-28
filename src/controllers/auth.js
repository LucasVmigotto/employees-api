const { sign } = require('jsonwebtoken')
const { makeResponse } = require('../../utils')
const config = require('../../config')

const authMe = async ({ body, logger }, res) => {
  try {

    if (!body.email) {

      return makeResponse(
        res,
        409,
        { 'message': 'Email credential is missing from login info' }
      )

    }

    const token = sign(
      { email: body.email },
      config.JWT_SECRET,
      {
        issuer: 'employees-api',
        expiresIn: config.JWT_EXP
      }
    )

    return makeResponse(
      res,
      201,
      { token }
    )

  } catch (err) {

    logger.error(`Exception in authMe: ${err}`)

    return makeResponse(
      res,
      500,
      { 'message': 'An internal error occurred' }
    )

  }

}

module.exports = { authMe }
