const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')
const { JWT_EXP, JWT_SECRET } = require('../../src/config')
const { signJWT } = require('../../src/utils')

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const { expect, request } = chai

const generateToken = (real = true) => signJWT(
  { email: 'example@email.com' },
  'test',
  real ? JWT_SECRET : 'fakeone',
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
