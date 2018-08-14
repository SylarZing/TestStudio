'use strict';

var express = require('express');
var router = express.Router();

var response = require('./response');
var helper = require('../common/helper');

var User = require('../model/User');
var Teacher = require('../model/Teacher');


router.post('/login',function(req, res, next){
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    res.send('login successfully.');
});

router.post('/register/user', function(req, res){

    var user = new User();
    user.strUserName = req.body.UserName;
    user.strPhone = req.body.Phone;
    user.strEmail = req.body.Email;
    user.strPassword = req.body.Password;
    user.iUserType = req.body.UserType;
    
    res.send('sign up successfully.');
});

router.post('/register/teacher', function(req, res){
    var teacher = new Teacher(req.body.id, req.body.username, req.body.Phone, req.body.Email,
                              req.body.password, req.body.usertype, req.body.teacherid, req.body.name);

    console.log(JSON.stringify(teacher));
    teacher.addTeacher().then(function(result){
        console.log('+++++/////////////////');
        console.log(JSON.stringify(result));
        console.log('/++++////////////////');

        response.SUCCESS.setMsg('Sign up teacher successfully.');
        response.SUCCESS.setData(teacher);
    }).catch(function(error){

    });


    
    
    
    res.send(JSON.stringify(response.SUCCESS));
    
});

router.post('/register/student', function(req, res){

});

router.post('/register/parent', function(req, res){

});

module.exports = router;