'use strict';

const DB_Config = require('./db_config');
const mysql = require('mysql');
const pool = mysql.createPool(DB_Config.mysql);

exports.excSql = (strSql, param) => {
    
    return new Promise (function(resolve, reject){
        pool.getConnection(function(err, connection){
            if (err){
                reject(err);
            }  
            connection.query(strSql, param, function(error, result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
                connection.release();
            });
        });
    });
    
}

exports.excTransaction = (arrSqls) => {
    console.log(arrSqls);
    return new Promise (function(resolve, reject){
        pool.getConnection (function(err, connection){
            if (err){
                resolve(err);
                return;
            }

            connection.beginTransaction(function(error){
                if(error) reject(error);
                var count = arrSqls.length;
                
                for(let i = 0; i < count; i++){
                    excSql(arrSqls[i]).catch((err) => {
                        connection.rollback(() => {reject(err)});
                    });
                }

                connection.commit((err) => {
                    if (err){
                        connection.rollback(() => {reject(err)});
                    }
                });

                console.log ('Transaction completed');
                resolve('Transaction Complete.');
                connection.release();
            });
        });
    });
}



