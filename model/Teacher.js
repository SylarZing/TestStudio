'use strict';

var User = require('./User');

class Teacher extends User {
    constructor(id, username, phone, email, password, usertype, teacherid, name){
        super(id, username, phone, email, password, usertype)
        this.TeacherId = teacherid;
        this.Name = name;
    }
}

module.exports = Teacher;