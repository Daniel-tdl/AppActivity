const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign')
const knex = require('./config/db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.db = knex;

consign()
    .then('./src/config/validations.js')
    .then('./src/controllers/activity.js')
    .then('./src/routes/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Servidor executando...')
})