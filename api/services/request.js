/**
 * Created by Edward Luna Noriega on 15/09/17.
 */
const request = require('request');
const configs = require('./config');
const utils = require('./utils');

module.exports = (name) => {
    return {
        cookie: request.jar(),
        authenticate: function () {
            const config = configs(name).account();
            config.jar = this.cookie;
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
            const config = configs(name).fleet(group);
            config.jar = this.cookie;
            return new Promise((resolve, reject) => {
                request(config, (error, response, body) => {
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
        },
        deviceData: function (device, limit) {
            const config = configs(name).device(device, limit);
            config.jar = this.cookie;
            return new Promise((resolve, reject) => {
                request(config, (error, response, body) => {
                    if (error || body === 'LOGOUT\n') {
                        console.log(error);
                        return reject({device: device, limit: limit});
                    }
                    resolve(body);
                });
            }).then(utils.parseXML).catch((data) => {
                return this.authenticate().then(() => {
                    return this.deviceData(data.device, data.limit);
                });
            });
        }

    };
};