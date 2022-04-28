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

  describe('GET /reports/employees/age', function () {
    it('Should return the younger, oldest and average age', async function () {
      const {
        statusCode,
        body: { younger, oldest, average }
      } = await request(httpServer)
        .get('/reports/employees/age')
        .set({ Authorization: `Bearer ${token}` })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(younger).to.be.not.null
      expect(oldest).to.be.not.null
      expect(average).to.be.not.null
    })
  })

})
