/**
 * Created by Edward Luna Noriega on 14/09/17.
 */
/**
 * Created by Edward Luna Noriega on 13/09/17.
 */

"use strict";

const utils = require('../services/utils');
const request = require('../services/request');

function setFormat(dataset) {
const device = {};
    const points = [];
    const data = utils.dataArray(dataset);
    for (let i = 0; i < data.length; i++) {
        if (utils.rowValidation(data[i])) {
            continue;
        }

        const rows = data[i].P;
        const info = rows[rows.length - 1].split("|");
        device.id = utils.formatId(info[0]);
        for (let j = 0; i < rows.length; j++) {
            const row = rows.split("|");

            const point = {
                lat: parseFloat(row[8]),
                lng: parseFloat(row[9])
            };
            points.push(point);
        }
    }
    return points;
}

function validation(res) {
    if (res.body === 'LOGOUT\n' || !res) {
        return Promise.reject({status: 401, msg: 'No se puede acceder al servicio.'});
    }
    return utils.parseXML(res.body)//.then(setFormat);
}

module.exports = name => {
    return {
        getPoints: (device, limit) => {
            const source = request(name);
            return source.device(device, limit).then(validation).catch(err => {
                if (err.status && err.status === 401) {
                    return source.authenticate(name).then((res) => {
                        return source.device(device, limit).then(validation);
                    });
                }
                return err;
            });
        }
    };
};