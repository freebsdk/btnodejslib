//
// Bithumb easy api for Node.js 
// Programmed by Seokyoung Shin (aceorb@gmail.com)
//

var bt_api_mod = require('./btapi.js');

var CONNECT_KEY = '(your connect api key goes here.)';
var SECRET_KEY = '(your secret key goes here.)';
var CURRENCY = 'ETH';   //BTC, ETH, DASH, LTC, ETC, XRP, BCH, XMR, ...



var main = function() {
    
    var bt_api = new bt_api_mod.BithumbApi(CONNECT_KEY, SECRET_KEY);

    bt_api.getAccount(CURRENCY, function(err, account_info) {
        if(err != null) {
            console.error('[getAccount] fail : '+err);
            return;
        }
    
        console.dir(account_info);
    });


    bt_api.getBalance(CURRENCY, function(err, balance_info) {
        if(err != null) {
            console.error('[getBalance] fail : '+err);
            return;
        }
    
        console.dir(balance_info);
    });
}





main();