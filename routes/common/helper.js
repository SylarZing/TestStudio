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
}

module.exports = helper;