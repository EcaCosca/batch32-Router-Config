# batch32-Router-Config

Commands I used in the queries for ElephantSQl


Creating the users table

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,      
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            age INT
        );


Creating users for that table

    INSERT INTO users (first_name, last_name, age) VALUES ('John', 'Doe', 18);

    INSERT INTO users (first_name, last_name, age) VALUES ('Bob', 'Dylan', 30);

    INSERT INTO users (first_name, last_name, age) VALUES ('Jane', 'Doe', 25);

Checking with a query that gives back all the users

        SELECT * FROM users;
