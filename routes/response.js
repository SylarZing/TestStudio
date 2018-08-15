'use strict';

class Response {
    constructor(code, msg, data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    setCode(code){
        this.code = code;
    }
    getCode(){
        return this.code;
    }

    setMsg(msg){
        this.msg = msg;
    }
    getMsg(){
        return this.msg;
    }

    setData(data){
        this.data = data;
    }
    getData(){
        return this.data;
    }

    getResponse(){
        return {'code':this.code, 'message':this.msg, 'data':this.data};
    }
}


module.exports = {
    SUCCESS         :           new Response(200, 'Connection Successful.', {}),
    FAILED          :           new Response(500, 'Business Failed.', {}),

    EXCEPTION       :           new Response(501, 'Internal Exceptions.', {})
}