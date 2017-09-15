/**
 * Created by Edward Luna Noriega on 13/09/17.
 */
const request = require('request');
const dateformat = require('dateformat');
const utils = require('../services/utils');
const accounts = require('../../config/account');
//const devices = require('../../config/sinergy.device');
const fleets = require('../../config/fleet');


module.exports = (name) => {
    return {
        cookie: request.jar(),
        accountConfig: function () {
            const config = accounts[name];
            config.jar = this.cookie;
            return config;
        },
        fleetConfig: function (group) {
            const config = fleets[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("yyyy/mm/dd/HH:MM");
            config.qs['group'] = group;
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
        fleetData: function (group) {
            const fleetConfig = this.fleetConfig(group);
            return new Promise((resolve, reject) => {
                request(fleetConfig, (error, response, body) => {
                    if (error || body === 'LOGOUT\n') {
                        console.log(error);
                        return reject(group);
                    }
                    resolve(body);
                });
            }).then(utils.parseXML).catch((group) => {
                return this.authenticate().then(() => {
                    return this.fleetData(group);
                });
            });
        }
    }
};