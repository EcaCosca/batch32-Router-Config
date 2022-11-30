const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { Pool } = require("pg");

app.use(bodyParser.json());

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
    .catch((err) => console.error(err.stack))
    // next()
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params; // We retrieve the id from the URL
    
    pool
    .query('SELECT * FROM users WHERE id=$1;', [id]) // We inject the id in the request
    .then(data => (
        !data.rows.length
        ? res.status(404).send("Can`t find this user")
        : res.status(200).json(data.rows)
        )) // We can send the data as a JSON
        .catch(e => console.log(e)) // In case of problem we send an HTTP code
});   

app.post("/users", (req, res) => {
    const { first_name, last_name, age } = req.body;
    
    pool
    .query('INSERT INTO users (first_name, last_name, age ) VALUES ($1, $2, $3);', [first_name, last_name, age])// We inject the name in the request
    .then(data => res.status(201).json(data))
    .catch(e => console.log(e));
});
    
app.put('/users/:id', (req, res, next) => {
    const { first_name, last_name, age } = req.body;
    const { id } = req.params; // We retrieve the id from the URL

    if(!first_name  || !last_name || !age){
        console.log('No empty fields')
    }

    const editData = (editing) => {
        console.log(editing)
    }

    pool
    .query('SELECT * FROM users WHERE id=$1;', [id]) // We inject the id in the request
    .then(data => (
        !data.rows.length
        ? res.status(404).send("Can`t find this user")
        // : res.status(200).json(data.rows)
        : editData(data.rows[0])
        )) // We can send the data as a JSON
        .catch(e => console.log(e)) // In case of problem we send an HTTP code    
})
   

app.listen(6000, () => console.log('connected'));