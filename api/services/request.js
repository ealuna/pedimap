/**
 * Created by Edward Luna Noriega on 15/09/17.
 */

"use strict";

const Promise = require('bluebird');
const dateformat = require('dateformat');
const request = Promise.promisify(require('request'));

const utils = require('./utils');
const fleets = require('../../config/fleet');
const devices = require('../../config/device');
const account = require('../../config/account');


module.exports = (name) => {
    return {
        cookie: request.jar(),
        authenticate: function () {
            const config = account[name];
            config.jar = this.cookie;
            config.forever = true;
            return request(config);
        },
        fleet: function (group) {
            const config = fleets[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("yyyy/mm/dd/HH:MM");
            config.qs['group'] = group;
            config.jar = this.cookie;
            config.forever = true;
            return request(config);
        },
        device: function (device, limit) {
            const config = devices[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = `${dateformat('dd/mm/yyyy')}/23:59`;
            config.qs['device'] = device;
            config.qs['limit'] = limit;
            config.jar = this.cookie;
            config.forever = true;
            return request(config);
        }
    }
};