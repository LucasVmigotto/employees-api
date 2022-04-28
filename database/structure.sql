DROP TABLE IF EXISTS employees;
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    birth_date DATE NOT NULL,
    CONSTRAINT employees_api_employees_id_key UNIQUE (id),
    CONSTRAINT employees_api_employees_email_pk PRIMARY KEY (email)
);
