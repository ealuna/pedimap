const request = require('request');
const dateformat = require('dateformat');
const utils = require('./api.utils');
const accounts = require('../../config/request.account.json');
const devices = require('../../config/request.device.json');
const fleets = require('../../config/request.fleet.json');


module.exports = (name) => {
    return {
        cookie: request.jar(),
        accountConfig: function() {
            const config = accounts[name];
            config.jar = this.cookie;
            return config;
        },
        fleetConfig: function(group) {
            const config = fleets[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("yyyy/mm/dd/HH:MM");
            config.qs['group'] = group;
            config.jar = this.cookie;
            return config;
        },
        deviceConfig: function(device, limit) {
            const config = devices[name];
            config.qs['_uniq'] = Math.random();
            config.qs['date_to'] = dateformat("yyyy/mm/dd/HH:MM");
            config.qs['device'] = device;
            config.qs['limit'] = limit;
            config.jar = this.cookie;
            return config;
        },
        authenticate: function() {
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
            const data = new Promise( (resolve, reject) => {
                request(fleetConfig, (error, response, body) => {
                    if(error || body === 'LOGOUT\n'){
                        return reject(error, group);
                    }
                    resolve(body);
                });
            });
            data.then(utils.parseXML);
            data.catch(this.fleetErrorHandler);
            return data;
        },
        deviceData: function(device, limit) {
            const deviceConfig = this.deviceConfig(device, limit);
            const data = new Promise( (resolve, reject) => {
                request(deviceConfig, (error, response, body) => {          
                    if(error || body === 'LOGOUT\n'){
                        return reject(error);
                    }
                    resolve(body);
                });
            });
            data.then(utils.parseXML);
            data.catch(this.deviceErrorHandler);

            /*const handler = this.authenticate();
             handler.then(() => {
             return this.fleetData(group);
             });*/
            return data;
        },
        fleetErrorHandler: function (error, group) {
            return this.authenticate().then(() => {
                return this.fleetData(group).then(utils.parseXML);
            });
        },
        deviceErrorHandler: function (error, device, limit) {
            return this.authenticate().then(() => {
                return this.deviceData(device, limit).then(utils.parseXML);
            });
        }
    }
};