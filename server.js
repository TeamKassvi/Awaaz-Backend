var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/signup', (req, res)=>{
    let user = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
    });

    user.save().then((user)=>{
       res.status(200).send(user);
    }, (error)=>{
        res.status(400).send(error);
    });
});

app.post('/signin', (req, res)=>{
   let email = req.body.email;
   let password = req.body.password;

   User.findOne({
        email: email,
        password: password
   }).then((user)=>{
       if (user === null || user === undefined)
           res.send({found: false});
       else
           res.send({
                   user:user,
                   found: true
               });
   }, (error)=>{
       res.status(400).send(error);
   })
});

app.get('/app/:id', (req, res)=>{
    let userID = req.params.id;

    if (ObjectID.isValid(userID)) {
        res.send("Application page here!");
    }else {
        res.status(404).send("No user found!")
    }
});

app.listen(3000, ()=>{
   console.log("Started on port 3000");
});

