const {
  expect,
  request,
  handleResponseError
} = require('../utils')
const config = require('../../src/config')
const createApp = require('../../src/app')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Auth', function () {
  let knex, httpServer

  before(function () {
    const {
      knex: localKnex,
      httpServer: localHttpServer
    } = createApp(config)

    knex = localKnex
    httpServer = localHttpServer
  })

  after(async function () {
    await knex.destroy()
  })

  describe('POST /auth', function () {
    it('Should throw error missing email', async function () {
      const {
        statusCode,
        body: { error }
      } = await request(httpServer)
        .post('/auth')
        .send({ foo: 'bar' })

      expect(statusCode).to.be.equal(409)
      expect(error).to.be.not.null
      expect(error).to.match(/Email credential is missing from login info/)
    })

    it('Should successfully return a signed token', async function () {
      const {
        statusCode,
        body: { token }
      } = await request(httpServer)
        .post('/auth')
        .send({ email: 'example@mail.com' })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(token).to.be.not.null
    })
  })
})
