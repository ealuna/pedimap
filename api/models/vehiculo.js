/**
 * Created by Edward Luna Noriega on 14/09/17.
 */
/**
 * Created by Edward Luna Noriega on 13/09/17.
 */
const request = require('request');
const dateformat = require('dateformat');
const utils = require('../services/api.utils');
const accounts = require('../../config/sinergy.account');
const devices = require('../../config/sinergy.device');
//const fleets = require('../../config/sinergy.fleet');


module.exports = (name) => {
    return {
        cookie: request.jar(),
        accountConfig: function () {
            const config = accounts[name];
            config.jar = this.cookie;
            return config;
        },
        deviceConfig: function(device, limit) {
            const config = devices[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("dd/mm/yyyy/HH:MM:ss");
            config.qs['device'] = device;
            config.qs['limit'] = limit;
            config.jar = this.cookie;
            return config;
        },
        authenticate: function () {
            const config = this.accountConfig();
            return new Promise((resolve, reject) => {
                request(config, (error, response, body) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();
                });
            });
        },
        deviceData: function (device, limit) {
            const config = this.deviceConfig(device, limit);
            console.log(config)
            return new Promise((resolve, reject) => {
                request(config, (error, response, body) => {
                    if (error || body === 'LOGOUT\n') {
                        console.log(error);
                        return reject({device: device, limit:limit});
                    }
                    resolve(body);
                });
            }).then(utils.parseXML).catch((data) => {
                return this.authenticate().then(() => {
                    return this.deviceData(data.device, data.limit);
                });
            });
        }
    }
};