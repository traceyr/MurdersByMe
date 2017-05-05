'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pg = require('pg');
const conString = 'postgres://localhost:5432';
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');

const client = new pg.Client(conString);

client.connect();
client.on('error', (error) => console.error(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
//proxy function call here
function proxySeattle(req,res) {
  console.log('routing Seattle API request for', req.params[0]);
  (requestProxy({
    url: `https://data.seattle.gov/resource/y7pv-r3kh.json?summarized_offense_description=HOMICIDE`,
    headers: {Authorization:`token ${process.env.SEATTLE_TOKEN}`}
  }))(req,res);
}
//git route that utilizes our proxy call for heroku
app.get('/', (req, res) => res.sendFile('index.html', {root: '.'}));
// app.get('/murders', (req, res) => {
//   client.query(`
//     SELECT * FROM murders`
//   ) //put search limitations into query - only 10 closest murders
//     .then(result => res.send(result.rows))
//     .catch(console.error);
// });
//Will we need a post request to put data into the database?
app.listen(PORT, () => console.log(`server up on Port ${PORT}`));

////////////////////DATABASE LOADER FUNCTION//////////////////
//coordinates_lat and coordinates_lon come from location_1 coordinates object
//from our ajax call can we pull these apart and put them in separately?
// function loadDB() {
//   client.query(`
//     CREATE IF NOT EXISTS
//     murders (
//       crimedate TEXT,
//       inside_outside TEXT,
//       coordinates_lat INTEGER,
//       coordinates_lon INTEGER,
//       premise TEXT,
//       weapaon TEXT,
//       total_incidents TEXT
//     );`)
//     .then(loadMurders)
//     .catch(console.error);
// };
