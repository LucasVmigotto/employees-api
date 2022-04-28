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
  let localEmployeeId = null
  let localEmployee = null
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

  describe('POST /employees', function () {

    const employToCreate = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      department: 'Support',
      salary: 2000.00,
      birth_date: '2000-07-02'
    }

    it('Should successfully create an employee', async function () {

      const {
        statusCode,
        body: { employeeId }
      } = await request(httpServer)
        .post('/employees')
        .set({ Authorization: `Bearer ${token}` })
        .send(employToCreate)
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(employeeId).to.be.not.null
      expect(employeeId).to.be.an('number')

      localEmployeeId = employeeId

    })

    it('Should throw email already in use error', async function () {

      const {
        statusCode,
        body: { error }
      } = await request(httpServer)
        .post('/employees')
        .set({ Authorization: `Bearer ${token}` })
        .send(employToCreate)

      expect(statusCode).to.be.equal(409)
      expect(error).to.be.not.null
      expect(error).to.match(/There is already a employee with this email/)

    })

  })

})
