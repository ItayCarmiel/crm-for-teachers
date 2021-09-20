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
    con.query(`SELECT ID FROM Accounts WHERE Email='${email}'`,function(err, result){
        if(err){
            res.status(400).json({status:"Something went wrong"})
        }
        if(result.length > 0){ // there is an email like this
            res.json({status:"Mail already exist",flag:false});
        }
        else {
            con.query(`insert into Accounts (FullName, Password, Email, Phone) values ('${fullName}','${password}','${email}','${phone}')`, function (err, result) {
                if (err) {
                    res.status(400).json({status:"Something went wrong"});
                }
                else{
                    res.status(200).json({status:"Success! You can now LogIn",flag:true})
                }
            });
        }
    });
    
});
 


app.listen(8004, () => {
  console.log(`Server running at http://localhost:8004/`);
});





