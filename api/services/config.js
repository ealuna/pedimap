/**
 * Created by Edward Luna Noriega on 21/08/17.
 */
const request = require('request');
const utils = require('./api.utils');
const account = require('../../config/sinergy.account');
const devices = require('../../config/sinergy.device');
const fleets = require('../../config/sinergy.fleet');


module.exports = (name) => {
    return {
        getAccountConfig: () => {
            return account[name];
        },
        getFleetConfig: (cookie, group) => {
            let config = fleets[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = utils.formatDatetime("yyyy/mm/dd/HH:MM");
            config.qs['group'] = group;
            config.headers['cookie'] = cookie;
            return config;
        },
        getDeviceConfig: (cookie, device, limit) => {
            let config = devices[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = utils.formatDatetime("yyyy/mm/dd/HH:MM");
            config.qs['device'] = device;
            config.qs['limit'] = limit;
            config.headers['cookie'] = cookie;
            return config;
        }        
    }
};