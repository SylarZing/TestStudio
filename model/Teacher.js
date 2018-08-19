'use strict';

var User = require('./User');

var db = require('../database/db');

var Helper = require('../common/helper');

class Teacher extends User {
    constructor(id, username, phone, email, password, usertype, teacherid, name){
        super(id, username, phone, email, password, usertype)
        this.TeacherId = teacherid;
        this.Name = name;
    }

    static IsTeacherExisted(userId) {

        var sqlSelect = 'SELECT * FROM T_TEACHER WHERE ID = ?';
        var param = [userId];
        
        return new Promise(function (resolve, reject) {
            db.excSql(sqlSelect, param)
                .then(function (result) {
                    let data = Helper.convertDataFromResult(result);
                    var arrResult = Helper.convertToArray(data);
                    resolve(arrResult.length > 0)
                }).catch(function (error) {
                    reject(error);
                });
        });
    }

    static addTeacher(UserID, TeacherName) {
        var sqlInsert = 'INSERT INTO T_TEACHER (ID, Name) values (?, ?)';
        var param = [UserID, TeacherName];
        
        return new Promise(function (resolve, reject) {
            db.excSql(sqlInsert, param)
                .then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }

    static GetTeacherById(UserID){
        
        var sqlSelect = 'SELECT T_USER.ID, T_USER.UserName, T_USER.Phone, T_USER.Email, T_USER.UserType, T_USER.IsActive, T_TEACHER.Name ' + 
                        'FROM T_USER, T_TEACHER ' + 
                        'where T_USER.ID = ? and T_USER.ID = T_TEACHER.ID';
        var param = [UserID];

        return new Promise(function (resolve, reject) {
            db.excSql(sqlSelect, param)
                .then(function (result) {
                    let data = Helper.convertDataFromResult(result);
                    var arrResult = Helper.convertToArray(data);

                    if(arrResult.length > 0){
                        resolve(arrResult[0]);
                    }else{
                        resolve(null);
                    }
                }).catch(function (error) {
                    reject(error);
                });
                
        });
    }

    static updateTeacherByID(UserID, Name){

        var sqlUpdate = 'update T_TEACHER SET Name = ? where ID = ?';
        var param = [Name, UserID];

        return new Promise(function (resolve, reject) {
            db.excSql(sqlUpdate, param)
                .then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
        });

    }
}

module.exports = Teacher;