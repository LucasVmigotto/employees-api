/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employees', t => {
    t.increments('id')
    t.string('name', 100).notNullable()
    t.string('email', 191).notNullable()
    t.string('department', 100).notNullable()
    t.decimal('salary').notNullable()
    t.date('birth_date').notNullable()
    t.primary('id')
    t.unique('email')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('employees')
}
