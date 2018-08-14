'use strict';

var User = require('./User');
var db = require('../database/db');

class Teacher extends User {
    constructor(id, username, phone, email, password, usertype, teacherid, name){
        super(id, username, phone, email, password, usertype)
        this.TeacherId = teacherid;
        this.Name = name;
    }

    addTeacher() {
        var sqlInsert = 'INSERT INTO T_USER (UserName, Phone, Email, Password, UserType, IsActive) values (?, ?, ?, ?, ?, ?)';
        var paraInsert = [this.UserName, this.Phone, this.Email, this.Password, 2, true];
        return new Promise (function(resolve, reject){
            db.excSql(sqlInsert, paraInsert)
            .then(function(result){
                //console.log ('///////////////');
                console.log (JSON.stringify(result));
                resolve(result);
                //console.log ('///////////////');
            }).catch(function(error){
                //console.log ('///////////////');
                console.log (JSON.stringify(error));
                reject(error);
                //console.log ('///////////////');
            });
        });
    }
}

module.exports = Teacher;