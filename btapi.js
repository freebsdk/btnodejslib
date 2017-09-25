//
// Bithumb easy api for Node.js 
// Programmed by Seokyoung Shin (aceorb@gmail.com)
//

var request = require('request');
var cryptojs = require('crypto-js');
var TIMEOUT_MSEC = 10*1000;






var arrayToParamStr = function(kv_obj) {
    
    var out = new Array();
    for(key in kv_obj) {
        out.push(key + '=' + encodeURIComponent(kv_obj[key]));
    }

    return out.join('&');
}





var chr = function(val)  {
    if (val > 0xFFFF) {
        val -= 0x10000;
        return String.fromCharCode(0xD800 + (val >> 10), 0xDC00 + (val & 0x3FF));
    }
    return String.fromCharCode(val);   
}





var BithumbApi = function(connect_key, secret_key) {
    this.api_url = 'https://api.bithumb.com';
    this.connect_key = connect_key;
    this.secret_key = secret_key;
}





BithumbApi.prototype.makeHeadersObj = function(end_point, param_obj) {
    var param_str = arrayToParamStr(param_obj);
    var nonce = new Date().getTime();
    var sign = new Buffer(cryptojs.HmacSHA512(end_point + chr(0) + param_str + chr(0) + nonce, this.secret_key).toString()).toString('base64');
    
    return {
        'Api-Key' : this.connect_key,
        'Api-Sign' : sign,
        'Api-Nonce' : nonce
    }
}




//end_point : ex) /info/balance
//param_obj : ex) {key:value, key:value}
BithumbApi.prototype.callApi = function(end_point, param_obj, callback) {

    var api_host = this.api_url + end_point;
    param_obj['endPoint'] = end_point;
    var hdr_obj = this.makeHeadersObj(end_point, param_obj);
    
    request.post({
        headers: hdr_obj,
        url: api_host,
        timeout: TIMEOUT_MSEC,
        formData: param_obj,
      }, function(err, res, body) {
          if(err != null) { console.error("[callApi] request fail : "+err); callback(err); return; }
          try {
              var res_obj = JSON.parse(body);
          }
          catch(e) {
            console.error("[callApi] exception : "+e);
            callback('invalid_json_response');
          }
        
          callback(null, res_obj);
      });
}




//callback result : f(err, info_json_obj)
BithumbApi.prototype.getAccount = function(currency, callback) {
    this.callApi('/info/account', {currency:currency}, callback);
}




//callback result : f(err, info_json_obj)
BithumbApi.prototype.getBalance = function(currency, callback) {
    this.callApi('/info/balance', {currency:currency}, callback);
}


//get wallt address
//callback result : f(err, info_json_obj)
BithumbApi.prototype.getWalletAdrs = function(currency, callback) {
    this.callApi('/info/wallet_address', {currency:currency}, callback);
}




//get last transaction information
//callback result : f(err, info_json_obj)
BithumbApi.prototype.getTicker = function(currency, callback) {
    this.callApi('/info/ticker', {currency:currency, payment_currency:'KRW'}, callback);
}



//cancel the placed order
//trade_type : bid (buy), ask(sell)
BithumbApi.prototype.cancel = function(currency, trade_type, order_id, callback) {
    
    if(trade_type != "bid" && trade_type != "ask") {
        console.error("[cancel] invalid trade type. : "+trade_type);
        callback('invalid_trade_type');
        return;
    }

    this.callApi('/trade/cancel', {currency:currency, type:trade_type, order_id:order_id}, callback);
}




module.exports = {
    BithumbApi : BithumbApi
}