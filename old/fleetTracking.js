/**
 * Created by Edward Luna Noriega on 21/08/17.
 */
const request = require('request');
const fs = require('fs');
//let data = {};
//let accounts = JSON.parse(fs.readFileSync('../../config/account.json', 'utf8'));

module.exports = {
    getDevice: function (name) {
        let devices = JSON.parse(fs.readFileSync('../../config/device.json', 'utf8'));
        return devices[name];
    },
    getFleet: function (name) {
        let fleets = JSON.parse(fs.readFileSync('../../config/request.fleet.json', 'utf8'));
        return fleets[name];
    },
    getAccount: function (name) {
        let accounts = JSON.parse(fs.readFileSync('../../config/account.json', 'utf8'));
        return accounts[name];
    },
    getNewCookie: function (name) {
        let account = this.getAccount(name);
        request(account, function (error, response, body) {
            if (!error) {
                return response.headers['set-cookie'].toString();
            } else {
                return {err: error};
            }
        });
    }
};