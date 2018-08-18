'use strict';

var express = require('express');
var router = express.Router();
var url = require('url');

var response = require('./response');
var Helper = require('../common/helper');

var Teacher = require('../model/Teacher');

router.post('/', function (req, res) {

    var teacher = new Teacher(
        req.body.id,
        req.body.username,
        req.body.phone,
        req.body.email,
        req.body.usertype,
        req.body.isactive,
        req.body.teacherid,
        req.body.name);

    if (teacher.ID === 0 || teacher.ID === null || teacher.ID === undefined) {
        var resp = response.FAILED;
        resp.msg = 'UserID is required.';
        res.send(JSON.stringify(resp));
    }

    if (Helper.isValueNullOrUndefineOrStringEmpty(teacher.Name)) {
        var resp = response.FAILED;
        resp.msg = 'Teacher Name is required.';
        res.send(JSON.stringify(resp));
    }

    Teacher.IsTeacherExisted(teacher.ID).then(function (ValidationResult) {

        if (!ValidationResult) {
            Teacher.addTeacher(teacher.ID, teacher.Name).then(function (InsertResult) {

                if (!Helper.isValueNullOrUndefine(InsertResult)) {
                    Teacher.GetTeacherById(teacher.ID).then(function (result) {
                        if (Helper.isValueNullOrUndefine(result)) {
                            var resp = response.FAILED;
                            resp.msg = 'Create teacher failed.';
                            res.send(JSON.stringify(resp));
                        } else {
                            var resp = response.SUCCESS;
                            resp.msg = 'Create teacher successfully.';
                            resp.data = result;
                            res.send(JSON.stringify(resp));
                        }

                    }).catch(function (error) {
                        var resp = response.FAILED;
                        resp.data = error;
                        res.send(JSON.stringify(resp));
                    });
                }

            }).catch(function (InsertError) {
                var resp = response.FAILED;
                resp.data = InsertError;
                res.send(JSON.stringify(resp));
            });

        } else {
            var resp = response.FAILED;
            resp.msg = 'Teacher is already existed.';
            res.send(JSON.stringify(resp));
        }

    });
});

router.put('/', function (req, res) {

    var teacher = new Teacher(
        req.body.id,
        req.body.username,
        req.body.phone,
        req.body.email,
        req.body.usertype,
        req.body.isactive,
        req.body.teacherid,
        req.body.name);

    if (teacher.ID === 0 || teacher.ID === null || teacher.ID === undefined) {
        var resp = response.FAILED;
        resp.msg = 'UserID is required.';
        res.send(JSON.stringify(resp));
    }

    if (Helper.isValueNullOrUndefineOrStringEmpty(teacher.Name)) {
        var resp = response.FAILED;
        resp.msg = 'Teacher Name is required.';
        res.send(JSON.stringify(resp));
    }

    Teacher.IsTeacherExisted(teacher.ID).then(function (ValidationResult) {

        if (ValidationResult) {
            Teacher.updateTeacherByID(teacher.ID, teacher.Name).then(function (UpdateResult) {

                if (!Helper.isValueNullOrUndefine(UpdateResult)) {
                    Teacher.GetTeacherById(teacher.ID).then(function (result) {
                        
                        if (Helper.isValueNullOrUndefine(result)) {
                            var resp = response.FAILED;
                            resp.msg = 'Update teacher failed.';
                            res.send(JSON.stringify(resp));
                        } else {
                            var resp = response.SUCCESS;
                            resp.msg = 'Update teacher successfully.';
                            resp.data = result;
                            res.send(JSON.stringify(resp));
                        }

                    }).catch(function (error) {
                        var resp = response.FAILED;
                        resp.data = error;
                        res.send(JSON.stringify(resp));
                    });
                }

            }).catch(function (UpdateError) {
                var resp = response.EXCEPTION;
                resp.data = UpdateError;
                res.send(JSON.stringify(resp));
            });
        } else {
            var resp = response.FAILED;
            resp.msg = 'Teacher is not existed.';
            res.send(JSON.stringify(resp));
        }

    });


});

router.get('', function (req, res) {
    
    var params = url.parse(req.url, true).query;
    var userId = params.ID;
    
    if (userId === 0 || userId === null || userId === undefined) {
        var resp = response.FAILED;
        resp.msg = 'UserID is required.';
        res.send(JSON.stringify(resp));
    }

    Teacher.GetTeacherById(userId).then(function (result) {
                        
        if (Helper.isValueNullOrUndefine(result)) {
            var resp = response.FAILED;
            resp.msg = 'Teacher is not existed.';
            res.send(JSON.stringify(resp));
        } else {
            var resp = response.SUCCESS;
            resp.msg = 'Get teacher successfully.';
            resp.data = result;
            res.send(JSON.stringify(resp));
        }

    }).catch(function (error) {
        var resp = response.FAILED;
        resp.data = error;
        res.send(JSON.stringify(resp));
    });
    
    
});

router.get('/list', function (req, res) {

});
module.exports = router;