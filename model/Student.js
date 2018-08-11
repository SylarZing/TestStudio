var User = require('./User');

class Student extends User {
    constructor (id, username, phone, email, password, usertype, studentid, name){
        super(id, username, phone, email, password, usertype)
        this.StudentId = studentid;
        this.Name = name;
    }
}