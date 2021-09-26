 var mysql = require('mysql');
 const express = require('express');
const app = express();
  
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  port:"3306",
  password: "1234",
  database: "project"
});

con.connect((err) => {
    if(err) throw err;
    console.log('Connected to DataBase');
})


var cors = require('cors')
app.use(cors());
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
   res.send('hello world')
  });

app.post('/signUp', function(req, res) {
    const fullName = req.body.fullName;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    con.query(`SELECT ID FROM teachers WHERE Email='${email}'`,function(err, result){
        if(err){
            res.status(400).json({status:"Something went wrong"})
        }
        else if(email.length < 1 || password.length < 1 || fullName.length < 1 || phone.length < 1 ){
            res.status(200).json({status:"You must fill all fields",flag:false});
        }
        else if(result.length > 0){ // there is an email like this
            res.json({status:"Mail already exist",flag:false});
        }
        else {
            con.query(`insert into teachers (FullName, Password, Email, Phone) values ('${fullName}','${password}','${email}','${phone}')`, function (err, result) {
                if (err) {
                    res.status(400).json({status:"Something went wrong"});
                }
                else{
                    res.status(200).json({status:"Success! You can now Login",flag:true})
                }
            });
        }
    });
    
});

app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    con.query(`SELECT * FROM teachers WHERE Email='${email}' AND Password='${password}'`,function(err, result){
        if (err) {
            res.status(400).json({status:"Something went wrong"});
        }
        else if(email.length < 1 || password.length < 1){
            res.status(200).json({status:"You must fill both fields", flag: false});
        } else if(result.length > 0){
            res.status(200).json({status: "Success!", id: result, flag:true});
        } else {
            res.status(200).json({status:"Wrong Mail or Password!", flag: false});
        }
    });
});
app.post('/schedule', function(req, res) {
    const id = req.body.id;
    con.query(`SELECT * FROM lessons INNER JOIN students ON lessons.TeacherId='${id}'`,function(err, result){
        if (err) {
            res.status(400).json({status:"Something went wrong"});
        }
        else {
            res.status(200).json({details: result});
        }
    });
});
 


app.listen(8004, () => {
  console.log(`Server running at http://localhost:8004/`);
});






