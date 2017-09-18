/**
 * Created by Edward Luna Noriega on 21/08/17.
 */

const dateformat = require('dateformat');

const account = require('../../config/account');
const devices = require('../../config/device');
const fleets = require('../../config/fleet');


module.exports = (name) => {
    return {
        account: () => {
            return account[name];
        },
        fleet: (group) => {
            const config = fleets[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("yyyy/mm/dd/HH:MM");
            config.qs['group'] = group;
            return config;
        },
        device: (device, limit) => {
            const config = devices[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("dd/mm/yyyy/HH:MM");
            config.qs['device'] = device;
            config.qs['limit'] = limit;
            return config;
        }        
    }
};