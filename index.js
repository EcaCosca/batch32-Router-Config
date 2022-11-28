const express = require('express')
const app = express()
const { Pool } = require("pg");

const connectionString = "postgres://pbgvrchd:pK4ngy5Ko2qtKCNg0Roy8nhB9sqSmvhZ@surus.db.elephantsql.com/pbgvrchd"; //Can be found in the Details page

const pool = new Pool({ connectionString });

app.get("/users", (req, res) => {
    pool
    .connect()
    .then(() => {
        pool.query(`SELECT * FROM users;`)
        .then(response => res.send(response.rows))
        .catch(err => console.log(err))
    })
    .catch((err) => console.error(err.stack));
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params; // We retrieve the id from the URL
    
    pool
    .query('SELECT * FROM users WHERE id=$1;', [id]) // We inject the id in the request
    .then(data => res.json(data.rows)) // We can send the data as a JSON
    .catch(e => res.sendStatus(404)); // In case of problem we send an HTTP code
});   


   app.listen(6000, () => console.log('connected'));