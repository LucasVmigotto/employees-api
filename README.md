# employees-api

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Lint Code](https://github.com/LucasVmigotto/employees-api/actions/workflows/lint.yml/badge.svg)](https://github.com/LucasVmigotto/employees-api/actions/workflows/lint.yml)
[![Code Coverage](https://github.com/LucasVmigotto/employees-api/actions/workflows/code-coverage.yml/badge.svg)](https://github.com/LucasVmigotto/employees-api/actions/workflows/code-coverage.yml)
[![codecov](https://codecov.io/gh/LucasVmigotto/employees-api/branch/dev/graph/badge.svg?token=KULRPCA1HD)](https://codecov.io/gh/LucasVmigotto/employees-api)

## Summary

* [Project Stack](#project-stack)
  * [Docker](#docker)
  * [Docker Compose](#docker-compose)
  * [Node.js](#node)
  * [PostgreSQL](#postgresql)
* [Setup Environment](#setup-environment)
* [Start Container Services](#start-container-services)
* [API Handbook](#api-handbook)
  * [Authorization](#authorization)
  * [Users](#users)

## Project Stack

### Docker

Develop a project in a [Docker](https://docs.docker.com/engine) environment it is a good practice in order to simulate the real production state, as well makes possible to easily configure and custom as needed.

### Docker Compose

Excellent tool to manage and run, without extensive configuration, multi container Docker applications. Start, stop, restart and remove easily containers makes the development flow more efficient with [docker-compose](https://docs.docker.com/compose).

### Node

Version: `^16.14`

Incredible ecosystem and runtime of JavaScript engine, one of the more recognizable, and loved, programing languages, [Node.js](https://nodejs.org/en/) allowed to developers reach a great level of scalability without thousands of lines of code.

### ExpressJS

Version: `^4.17.3`

Maybe the more famous REST API library to Node.js, [expressjs](https://expressjs.com/) offers an easy platform to build simple or complex API applications, with external libs support to be added as needed.

### KnexJS

Version: `^1.0.7`

Good query builder as well offers migrations support, [Knex](http://knexjs.org/) you just need to specify the database and connection auth to start using, no need for lines of code with long queries.

### PostgreSQL

Version: `14`

One of the most complete databases at the moment, [PostgresSQL](https://www.postgresql.org/docs/14/index.html) offers a whole group of functions and data type that make the data modeling accurate and effective.

## Setup Environment

The project was built in a [Docker](https://docs.docker.com/engine) environment and [docker-compose](https://docs.docker.com/compose), that said, you can use it to run the project as well.

1. Copy the `.env.example` file and rename it to `.env`

    ```bash
    cp .env.example .env
    ```

    > Customize the values as needed

2. Run the container in CLI mode

    ```bash
    docker-compose run --rm --service-ports employees-api bash
    ```

3. Install the dependencies

    ```bash
    yarn
    ```

4. Migrate to last database version

    ```bash
    yarn migrate:latest
    ```

5. Exit from CLI

## Start Container Services

You can start the services and use it as need such as the following examples:

* Bash CLI

    ```bash
    docker-compose run --rm --service-ports employees-api bash
    ```

* Start API

    ```bash
    docker-compose up employees-api bash
    ```

* Postgres CLI

    ```bash
    docker-compose run --rm pgsql-cli
    ```

## API Handbook

Use the [Postman](https://www.postman.com/product/what-is-postman/) collection in `docs/collections` folder to test the API's endpoints

* In order to use the API, you need to start up the services first
* Note that for some tests (e.g. edit a post with other user token that not the owner) you have to create more than one user.
* After the user creation, use the `/auth` endpoint to generate a token for each user that you will use in requests contexts, than set the token as Postman Collection Variable

### Authorization

* **POST**: `/auth`

  User has to submit his email address, and if it is valid, will return the signed token to use in API endpoints

  ```json
  {
      "email": "example@mail.com"
  }
  ```

### Employees

* **GET** `/employees` - (Protected)

  List all employees registered into the database

* **GET** `/employees/<employeeId>` - (Protected)

  List more info about the employee related to given `id`

* **POST** `/employees` - (Protected)

  Create, with the given values in JSON payload, the employee into the database

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "department": "Support",
    "salary": 2000.00,
    "birth_date": "2000-07-02"
  }
  ```

* **PUT** `/employees/<employeeId>` - (Protected)

  Update the the given values in JSON payload related to the employee `id` informed

  ```json
  {
    "name": "John Doe Changed",
    "email": "john.doe.changed@email.com",
    "department": "Support",
    "salary": 2000.00,
    "birth_date": "2000-07-02"
  }
  ```

* **DELETE** `/employees/<employeeId>` - (Protected)

  Delete the employee with the `id` informed

### Reports

* **GET** `/reports/employees/salary` - (Protected)

  Get the highest and lowest salary between employees

* **GET** `/reports/employees/age` - (Protected)

  Get the highest and lowest age between employees
