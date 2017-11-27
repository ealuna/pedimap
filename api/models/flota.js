/**
 * Created by Edward Luna Noriega on 13/09/17.
 */

"use strict";

const utils = require('../services/utils');
const request = require('../services/request');

function setFormat(dataset) {
    const fleet = [];
    const data = utils.dataArray(dataset);
    for (let i = 0; i < data.length; i++) {
        if (utils.rowValidation(data[i])) {
            continue;
        }
        const values = data[i].P;
        const row = values[0].split('|');
        const device = {
            id: utils.formatId(row[0]),
            device: data[i].$.id,
            vehicle: utils.formatVehicle(row[1]),
            datetime: `${row[3]} ${row[4]}`,
            status: utils.decodeUnicode(row[6]),
            position: {
                lat: parseFloat(row[8]),
                lng: parseFloat(row[9])
            },
            kmh: row[12],
            location: utils.decodeUnicode(row[20]).replace(/"/g, '')
        };
        fleet.push(device);
    }
    return fleet;
}

function validation(res) {
    if (res.body === 'LOGOUT\n' || !res) {
        //console.log(res.body)
        return Promise.reject({status: 401, msg: 'No se puede acceder al servicio.'});
    }
    return utils.parseXML(res.body).then(setFormat);
}

module.exports = name => {
    return {
        getGroup: (group) => {
            const source = request(name);
            return source.fleet(group).then(validation).catch(err => {
                //console.log(err)
                if (err.status && err.status === 401) {
                    return source.authenticate(name).then((res) => {
                        //console.log(res.body)
                        return source.fleet(group).then(validation);
                    });
                }
                return Promise.reject(err);
            });
        }
    };
};




