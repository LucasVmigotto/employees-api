const {
  EMPLOYEE_FIELDS,
  makeResponse
} = require('../utils')

exports.listEmployees = async ({ knex, logger }, res) => {
  try {

    const employees = await knex('employees')
      .select(EMPLOYEE_FIELDS)

    return makeResponse(
      res,
      200,
      { employees }
    )

  } catch (err) {
    logger.error(`Problem in listEmployees: ${err}`)
    return makeResponse(
      res,
      500,
      { error: 'An internal error occurred' }
    )
  }
}

exports.getEmployee = async ({ knex, logger, params }, res) => {
  try {

    const { employeeId: id } = params

    const [employee] = await knex('employees')
      .select(EMPLOYEE_FIELDS)
      .where({ id })

    return makeResponse(
      res,
      200,
      { employee }
    )

  } catch (err) {

    logger.error(`Problem in getEmployee: ${err}`)

    return makeResponse(
      res,
      500,
      { error: 'An internal error occurred' }
    )

  }
}

exports.createEmployee = async ({ knex, logger, body }, res) => {
  try {

    const [employee] = await knex('employees')
      .insert(body)
      .returning('id')

    return makeResponse(
      res,
      200,
      { employeeId: employee.id }
    )

  } catch (err) {

    logger.error(`Problem in createEmployee: ${err}`)

    const error = err.code === '23505'
      ? { error: 'There is already a user with this email' }
      : { error: 'An internal error occurred' }

    return makeResponse(
      res,
      500,
      error
    )

  }
}

exports.updateEmployee = async ({ knex, logger, params, body }, res) => {
  try {

    const { employeeId: id } = params

    const [employee] = await knex('employees')
      .update(body)
      .where({ id })
      .returning('id')

    return makeResponse(
      res,
      200,
      { employeeId: employee.id }
    )

  } catch (err) {

    logger.error(`Problem in updateEmployee: ${err}`)

    const error = err.code === '23505'
      ? { error: 'There is already a user with this name' }
      : { error: 'An internal error occurred' }

    return makeResponse(
      res,
      500,
      error
    )

  }
}

exports.deleteEmployee = async ({ knex, logger, params }, res) => {
  try {

    const { employeeId: id } = params

    const deleted = await knex('employees')
      .where({ id })
      .del()

    return makeResponse(
      res,
      !!deleted ? 204 : 409,
      !!deleted ?
        null :
        { error: 'Employee could be deleted' }
    )

  } catch (err) {

    logger.error(`Problem in deleteEmployee: ${err}`)

    return makeResponse(
      res,
      500,
      { error: 'An internal error occurred' }
    )

  }
}
