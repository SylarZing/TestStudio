'use strict';

var db = require('../database/db');
var Helper = require('../common/helper');

class User {
    constructor(id, username, phone, email, password, usertype, isactive) {
        this.ID = id;
        this.UserName = username;
        this.Phone = phone;
        this.Email = email;
        this.Password = password;
        this.UserType = usertype;
        this.IsActive = isactive;
    }

    static IsUserNameInvalid(username){
        return Helper.isValueNullOrUndefineOrStringEmpty(username);
    }

    static IsUserExisted(username) {

        var sqlSelect = 'SELECT * FROM T_USER WHERE UserName = ?';
        var param = [username];

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

    static GetUserByName(username){
        
        var sqlSelect = 'SELECT * FROM T_USER WHERE UserName = ?';
        var param = [username];

        return new Promise(function (resolve, reject) {
            console.log(sqlSelect);
            console.log(param);
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

    static AddUser(username, phone, email, password, usertype, isactive) {

        var sqlInsert = 'INSERT INTO T_USER (UserName, Phone, Email, Password, UserType, IsActive) values (?, ?, ?, ?, ?, ?)';
        var param = [username, phone, email, password, usertype, isactive];
        return new Promise(function (resolve, reject) {
            db.excSql(sqlInsert, param)
                .then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
        });

    }
}

module.exports = User;