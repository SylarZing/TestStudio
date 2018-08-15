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

    var user = new User('',
                        req.body.username,
                        req.body.phone,
                        req.body.email,
                        req.body.password,
                        5,
                        true);

    if (User.IsUserNameInvalid(user.UserName)){
        var resp = response.FAILED;
        resp.msg = 'User Name Required.';
        res.send(JSON.stringify(resp));
    }

    User.IsUserExisted(user.UserName).then(function(ValidationResult){
        if(!ValidationResult){
            User.AddUser(user.UserName, user.Phone, user.Email, user.Password, user.UserType, user.IsActive).then(function(InsertResult){
                
                if (!helper.isValueNullOrUndefine(InsertResult)){
                    User.GetUserByName(user.UserName).then(function(result){

                        if (helper.isValueNullOrUndefine(result)){
                            var resp = response.FAILED;
                            resp.msg = 'Sign up failed.';
                            res.send(JSON.stringify(resp));
                        } else{
                            var resp = response.SUCCESS;
                            resp.msg = 'Sign up successfully.';
                            resp.data = result;
                            res.send(JSON.stringify(resp));
                        }

                    }).catch(function(error){

                        var resp = response.EXCEPTION;
                        resp.data = error;
                        res.send(JSON.stringify(resp));

                    });
                }
            }).catch(function(error){

                var resp = response.EXCEPTION;
                resp.data = error;
                res.send(JSON.stringify(resp));

            });
        } else {
            var resp = response.FAILED;
            resp.msg = 'User Name Duplicated.';
            res.send(JSON.stringify(resp));
        }
    })
});

module.exports = router;