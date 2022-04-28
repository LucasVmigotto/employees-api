const {
  expect,
  request,
  handleResponseError,
  generateToken
} = require('../utils')
const config = require('../../src/config')
const createApp = require('../../src/app')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Employees', function () {

  const token = generateToken()
  let employee = null
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

  describe('GET /employees', function () {

    it('Should successfully a employees list', async function () {

      const {
        statusCode,
        body: { employees }
      } = await request(httpServer)
        .get('/employees')
        .set({ Authorization: `Bearer ${token}` })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(employees).to.be.not.null
      expect(employees).to.be.an('array')

    })

  })

})
