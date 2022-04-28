const {
  signJWT,
  makeResponse
} = require('../utils')
const config = require('../config')

const authMe = async ({ body, logger }, res) => {
  try {
    if (!body.email) {
      return makeResponse(
        res,
        409,
        { error: 'Email credential is missing from login info' }
      )
    }

    const token = signJWT(
      { email: body.email },
      'employees-api',
      config.JWT_SECRET,
      config.JWT_EXP
    )

    return makeResponse(
      res,
      200,
      { token }
    )
  } catch (err) {
    /* istanbul ignore next */
    logger.error(`Exception in authMe: ${err}`)

    /* istanbul ignore next */
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )
  }
}

module.exports = { authMe }
