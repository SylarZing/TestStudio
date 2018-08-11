'use strict';

var User = require('./User');

class Parent extends User {
    constructor (id, username, phone, email, password, usertype, parentid, name){
        super(id, username, phone, email, password, usertype)
        this.ParentId = parentid;
        this.Name = name;
    }
}

module.exports = Parent;