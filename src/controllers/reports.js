const {
  EMPLOYEE_FIELDS,
  makeResponse
} = require('../utils')

exports.reportByAge = async ({ knex, logger }, res) => {
  try {
    const [[younger], [older], [average]] = await Promise.all([
      knex('employees')
        .select(EMPLOYEE_FIELDS)
        .orderBy('birth_date', 'desc')
        .limit(1),
      knex('employees')
        .select(EMPLOYEE_FIELDS)
        .orderBy('birth_date')
        .limit(1),
      knex('employees')
        .avg(knex.raw('EXTRACT(YEARS FROM AGE(??))', 'birth_date'))
    ])

    return makeResponse(
      res,
      200,
      {
        younger,
        older,
        average
      }
    )
  } catch (err) {
    /* istanbul ignore next */
    logger.error(`Exception in reportByAge: ${knex}`)

    /* istanbul ignore next */
    return makeResponse(
      res,
      500,
      { error: 'An internal error occurred' }
    )
  }
}

exports.reportBySalary = async ({ knex, logger }, res) => {
  try {
    const [[lowest], [highest], [average]] = await Promise.all([
      knex('employees')
        .select(EMPLOYEE_FIELDS)
        .orderBy('salary')
        .limit(1),
      knex('employees')
        .select(EMPLOYEE_FIELDS)
        .orderBy('salary', 'desc')
        .limit(1),
      knex('employees')
        .avg('salary')
    ])

    return makeResponse(
      res,
      200,
      {
        lowest,
        highest,
        average
      }
    )
  } catch (err) {
    /* istanbul ignore next */
    logger.error(`Exception in reportBySalary: ${knex}`)

    /* istanbul ignore next */
    return makeResponse(
      res,
      500,
      { error: 'An internal error occurred' }
    )
  }
}
