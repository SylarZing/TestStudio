'use strict';

var db = require('../database/db');

var Helper = require('../common/helper');

class LevelMajor {
    constructor(levelid, majorid){
        this.LevelId = levelid;
        this.MajorId = majorid;
    }

    static GetUserLevelMajorById(userid) {

        var sqlSelect = 'SELECT Level, Major FROM T_LEVELMAJOR WHERE UserID = 15';
        var param = [];
        
        return new Promise(function (resolve, reject) {
            db.excSql(sqlSelect, param)
                .then(function (result) {
                    let data = Helper.convertDataFromResult(result);
                    var arrResult = Helper.convertToArray(data);

                    if (arrResult.length > 0) {
                        resolve(arrResult);
                    } else {
                        resolve(null);
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });

    }
}

module.exports = LevelMajor;