const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
//const cors = require('cors');

app.use(bodyParser.json());
//app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'userdb'
});

db.connect()

app.get('/fetch_all_users', (req, res) => {
  var sql = 'SELECT * FROM Users';
  db.query(sql, (err, result)=>{
      if(err) throw err;
      res.send(JSON.stringify(result));
  });

});

app.get('/fetch_user/', (req, res) => {

  const url = new URL("http://localhost:3000" + req.url);
  const email =  url.searchParams.get('email')
  const password = url.searchParams.get('password')

  var sql = 'SELECT * FROM Users WHERE email=? AND password=? LIMIT 1';
  db.query(sql, [email, password], (err, result)=>{
      if(err) throw err;
      if(result.length == 1){
        res.send({user : JSON.stringify(result[0])});
      }
      else res.send({user : null});
  });
});

app.post('/add_user', (req, res) => {
  var sql = `INSERT INTO Users (FirstName, LastName, Email, Password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send({success: true});
  });
});
