'use strict';

var express = require('express');
var router = express.Router();

var User = require('../model/User');


router.post('/login',function(req, res, next){
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    res.send('login successfully.');
});

router.post('/register', function(req, res, next){

    var user = new User();
    user.strUserName = req.body.UserName;
    user.strPhone = req.body.Phone;
    user.strEmail = req.body.Email;
    user.strPassword = req.body.Password;
    user.iUserType = req.body.UserType;
    
    res.send('sign up successfully.');
});

router.post('/register/teacher', function(req, res){

});

router.post('/register/student', function(req, res){

});

router.post('/register/parent', function(req, res){

});

module.exports = router;