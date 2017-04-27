'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pg = require('pg');
const conString = 'postgres://localhost:5432';
const bodyParser = require('body-parser');

const client = new pg.Client(conString);

client.connect();
client.on('error', (error) => console.error(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) => res.sendFile('index.html', {root: '.'}));

app.listen(PORT, () => console.log(`server up on Port ${PORT}`));
