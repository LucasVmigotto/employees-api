const { protectedByAuth } = require('../security')
const { authMe } = require('../controllers/auth')

const employees = require('../controllers/employees')
const reports = require('../controllers/reports')

module.exports = app => {

  app.post('/auth', authMe)

  app.post('/employees', protectedByAuth, employees.createEmployee)
  app.get('/employees', protectedByAuth, employees.listEmployees)
  app.get('/employees/:employId', protectedByAuth, employees.getEmployee)
  app.put('/employees/:employeeId', protectedByAuth, employees.updateEmployee)
  app.delete('/employees/:employeeId', protectedByAuth, employees.deleteEmployee)

  app.get('/reports/employees/age', protectedByAuth, reports.reportByAge)
  app.get('/reports/employees/salary', protectedByAuth, reports.reportBySalary)

}
