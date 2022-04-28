const chai = require('chai')
const chaiHttp = require('chai-http')
const { JWT_EXP, JWT_SECRET } = require('../../src/config')
const { signJWT } = require('../../src/utils')

chai.use(chaiHttp)

const { expect, request } = chai

const generateToken = () => signJWT(
  { email: 'example@email.com' },
  'test',
  JWT_SECRET,
  JWT_EXP
)

const handleResponseError = res => {
  if (res.body.error) {

    return Promise.reject(res.body.error)

  }
  return res
}

module.exports = {
  handleResponseError,
  generateToken,
  expect,
  request
}
