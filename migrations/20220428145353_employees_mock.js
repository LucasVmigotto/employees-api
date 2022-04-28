const sample = [
  { name: 'Anakin Skywalker',
    email: 'thechoosenone@force.com',
    department: 'Padawan',
    salary: 4000.00,
    birth_date: '1981-04-19'
  },
  { name: 'Padmé Amidala',
    email: 'ilovecclothes@naboo.com',
    department: 'Senator',
    salary: 80000.00,
    birth_date: '1981-06-09'
  },
  { name: 'Obi Wan Kenobi',
    email: 'highground@jedi.council.com',
    department: 'Master Jedi',
    salary: 6000.00,
    birth_date: '1971-03-31'
  },
  { name: 'Luke Skywalker',
    email: 'lastjedi@force.com',
    department: 'Jedi',
    salary: 5000.00,
    birth_date: '1951-09-25'
  },
  { name: 'Leia Organa',
    email: 'thechoosenone@alderaan.com',
    department: 'Princess',
    salary: 4000.00,
    birth_date: '1956-10-21'
  }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex('employees')
    .insert(sample)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  const promises = []

  sample.map(({ email }) => promises.push(
    knex('employees')
      .where({ email })
      .del()
  ))

  return Promise.all(promises)
}
