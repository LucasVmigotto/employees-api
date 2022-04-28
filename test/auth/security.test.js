const { JWT_SECRET } = require('../../src/config')
const {
  expect,
  generateToken
} = require('../utils')
const {
  verifyToken,
  parseAuthorization
} = require('../../src/security')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Security', function () {
  describe('parseAuthorization', function () {
    const token = generateToken()

    it('Should return token', function () {
      expect(parseAuthorization(`Bearer ${token}`))
        .to
        .be
        .equal(token)
    })

    it('Should throw unsupported method error', function () {
      expect(function () {
        parseAuthorization(`Error ${token}`)
      })
        .to
        .throw(Error, /Unsupported authorization method/)
    })
  })
})
