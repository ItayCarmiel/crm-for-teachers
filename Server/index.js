 var mysql = require('mysql');
 const express = require('express');
const app = express(); 
var jwt = require("jsonwebtoken");
require("dotenv").config();
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
    const title = req.body.title;
    con.query(`SELECT * FROM ?? WHERE Email='${email}'`,[title], function(err, result){
        if(err){
            res.status(400).json({status:"Something went wrong"})
        }
        else if(email.length < 1 || password.length < 1 || fullName.length < 1 || phone.length < 1){
            res.status(200).json({status:"You must fill all fields",flag:false});
        }
        else if(result.length > 0){ // there is an email like this
            res.json({status:"Mail already exist",flag:false});
        }
        else {
            con.query(`insert into ?? (FullName, Password, Email, Phone) values ('${fullName}','${password}','${email}','${phone}')`,[title], function (err, result) {
                if (err) {
                    res.status(400).json({status:"Something went wrong"});
                }
                else{
                    res.status(200).json({status:"Success! You can now Login",flag:true});
                }
            });
        }
    });  
});

app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const title = req.body.title;
    con.query(`SELECT * FROM ?? WHERE Email='${email}' AND Password='${password}'`,[title], function(err, result){
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
app.post('/teacherSchedule', function(req, res) {
    const id = req.body.id;
    con.query(`SELECT DISTINCT * FROM lessons  WHERE lessons.TeacherId='${id}'`,function(err, result){
        if (err) {
            res.status(400).json({status:"Something went wrong"});
        }
        else {
            res.status(200).json({details: result});
        }
    });
});

app.post('/studentSchedule', function(req, res) {
    const id = req.body.id;
    con.query(`SELECT * FROM lessons WHERE lessons.StudentId='${id}'`,function(err, result){
        if (err) {
            res.status(400).json({status:"Something went wrong"});
        }
        else {
            res.status(200).json({details: result});
        }
    });
});

app.post('/jwtVerify', function(req, res) {
    const token = req.body.token;
        try {
            var id = jwt.verify(token,"" + process.env.JWT_KEY);
            res.status(200).json({details: id, flag: true});
        }
        catch{
            res.status(400).json({flag:false});
        }
    });
 
app.post('/jwtSign', function(req, res) {
        const id = req.body.id;
        const title = req.body.title;
            try {
                token = jwt.sign(
					{ user_id: id,
					title: title},
					"" + process.env.JWT_KEY,
					{
						expiresIn: "2h",
					}
					);
                res.status(200).json({details: token, flag: true});
            }
            catch{
                res.status(400).json({flag:false});
            }
        });

app.post('/addLesson', function(req, res) {
    const teacherId = req.body.teacherId;
    const teacherName = req.body.teacherName;
    const dateTime = req.body.dateTime;
    const location = req.body.location;
    con.query(`insert into lessons (TeacherId, TeacherName, date_time, isOnline) values ('${teacherId}','${teacherName}','${dateTime}','${location}')`, function (err, result) {
        if (err) {
            res.status(400).json({flag: false});
        }
        else{
            res.status(200).json({details: result, flag: true});  
        }
    }); 
    });


app.listen(8004, () => {
  console.log(`Server running at http://localhost:8004/`);
});




