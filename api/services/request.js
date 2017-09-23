/**
 * Created by Edward Luna Noriega on 15/09/17.
 */

"use strict";

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const configs = require('./config');
const utils = require('./utils');

module.exports = (name) => {
    return {
        cookie: request.jar(),
        authenticate: function () {
            const config = configs(name).account();
            config.jar = this.cookie;
            config.forever = true;
            return request(config);
        },
        validate: function (res) {
            if (res.body === 'LOGOUT\n') {
                return Promise.reject('Logout');
            }
            return utils.parseXML(res.body);
        },
        fleet: function (group) {
            const config = configs(name).fleet(group);
            config.jar = this.cookie;
            config.forever = true;
            return request(config).then(this.validate).catch((err) => {
                return this.authenticate().then(() => {
                    return this.fleet(group);
                });
            });
        },
        device: function (device, limit) {
            const config = configs(name).device(device, limit);
            config.jar = this.cookie;
            return request(config).then(this.validate).catch((err) => {
                return this.authenticate().then(() => {
                    return this.device(device, limit);
                });
            });
        }
    }
};