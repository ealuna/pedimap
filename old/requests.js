const request  = require('request');
const config1 = require('./config');

module.exports = (name) => {
	const config = config1(name);
	return {
		getNewCookie: () => {
			const account = config.getAccountConfig();			
            return new Promise((resolve, reject) => {
                request(account, (error, response, body) => {
                    if (error) {
                        return reject(error);                        
                    }
                    resolve(response.headers['set-cookie'].toString());
                });
            });   
        },
		getFleetData: (cookie, group) => {
			let fleetConfig = config.getFleetConfig(cookie, group);			
			return new Promise( (resolve, reject) => {
				request(fleetConfig, (error, response, body) => {
					if(error || body === 'LOGOUT\n'){
						return reject(error);
					}
					resolve(body);
				});
			});
		},
		getDeviceData: (cookie, device, limit) => {
			let deviceConfig = config.getDeviceConfig(cookie, device, limit);	
			return new Promise( (resolve, reject) => {
				request(deviceConfig, (error, response, body) => {			
					if(error || body === 'LOGOUT\n'){
						return reject(error);
					}
					resolve(body);
				});
			});
		}
	};
};