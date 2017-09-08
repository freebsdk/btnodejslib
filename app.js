/*
The software packages are provided “as is”. The original coder makes no warranties, 
expressed or implied, and hereby disclaims and negates all other warranties, 
including without limitation, implied warranties or conditions of merchantability, 
fitness for a particular purpose, or non-infringement of intellectual property or 
other violation of rights or lost of money related to cryptocurrencies trading. 
Further, the original coder does not warrant or make any representations 
concerning the accuracy, likely results, or reliability of the use of this software, 
included lost of money related to cryptocurrencies trading due to the different settings 
and configurations of this software the end-user is allowed to change.

Bithumb easy api for Node.js 
Programmed by Seokyoung Shin (aceorb@gmail.com)
*/

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