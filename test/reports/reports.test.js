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

  describe('GET /reports/employees/salary', function () {
    it('Should return the lowest, highest and average salary', async function () {
      const {
        statusCode,
        body: { lowest, highest, average }
      } = await request(httpServer)
        .get('/reports/employees/salary')
        .set({ Authorization: `Bearer ${token}` })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(lowest).to.be.not.null
      expect(highest).to.be.not.null
      expect(average).to.be.not.null
    })
  })
})
