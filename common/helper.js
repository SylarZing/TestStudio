'use strict';

class helper{
    
    static isValueNull(value){
        return (value === null);
    }

    static isValueUndefined(value){
        return (value === undefined);
    }

    static isValueNullOrUndefine(value){
        return (value === null || value === undefined);
    }

    static isValueStringEmpty(value){
        return (value === '');
    }

    static isValueNullOrUndefineOrStringEmpty(value){
        return (value === null || value === undefined || value === '');
    }

    static convertDataFromResult(result){
        let json = JSON.stringify(result);
        return JSON.parse(json);
    }

    static convertToArray(data){
        var arr = [];
        for (var item in data){
            arr.push(data[item]);
        }
        return arr;
    }
}

module.exports = helper;