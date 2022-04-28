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
    it('Should throw error becouse token was not sent', async function () {
      const {
        statusCode,
        body: { error }
      } = await request(httpServer)
        .get('/employees')

      expect(statusCode).to.be.equal(409)
      expect(error).to.be.not.null
      expect(error).to.match(/No token was submitted/)
    })

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

  describe('GET /employees/<employeeId>', function () {
    it('Should return an employee by id', async function () {
      const {
        statusCode,
        body: { employee }
      } = await request(httpServer)
        .get(`/employees/${localEmployeeId}`)
        .set({ Authorization: `Bearer ${token}` })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(200)
      expect(employee).to.be.not.null
      expect(employee).to.have.property('id')
      expect(employee).to.have.property('name')
      expect(employee).to.have.property('email')
      expect(employee).to.have.property('department')
      expect(employee).to.have.property('salary')
      expect(employee).to.have.property('birth_date')
    })
  })

  describe('PUT /employees/<employeeId>', function () {
    it('Should successfully update an employee', async function () {
      const {
        statusCode,
        body: { employeeId }
      } = await request(httpServer)
        .put(`/employees/${localEmployeeId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          name: 'John Doe Changed',
          email: 'john.doe.changed@email.com',
          department: 'Support',
          salary: 4000.00,
          birth_date: '2000-02-07'
        })

      expect(statusCode).to.be.equal(200)
      expect(employeeId).to.be.not.null
      expect(employeeId).to.be.an('number')
    })
  })

  describe('DELETE /employees/<employeeId>', function () {
    it('Should successfully delete a employee', async function () {
      const { statusCode } = await request(httpServer)
        .delete(`/employees/${localEmployeeId}`)
        .set({ Authorization: `Bearer ${token}` })
        .then(handleResponseError)

      expect(statusCode).to.be.equal(204)
    })

    it('Should throw not deleted employee', async function () {
      const {
        statusCode,
        body: { error }
      } = await request(httpServer)
        .delete(`/employees/${localEmployeeId}`)
        .set({ Authorization: `Bearer ${token}` })

      expect(statusCode).to.be.equal(409)
      expect(error).to.match(/Employee could be deleted/)
    })
  })
})
