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
    const vehicles = [];
    const points = [];
    const data = utils.dataArray(dataset);
    for (let i = 0; i < data.length; i++) {
        if (utils.rowValidation(data[i])) {
            continue;
        }

        const rows = data[i].P;
        const values = rows[0].split('|');

        const vehicle = {
            id: utils.formatId(values[0]),
            device: data[i].$.id,
            vehicle: utils.formatVehicle(values[1])
        };

        for (let j = 0; j < rows.length; j++) {
            const row = rows[j].split('|');
            const point = {
                datetime: `${row[3]} ${row[4]}`,
                status: utils.decodeUnicode(row[6]),
                position: {
                    lat: parseFloat(row[8]),
                    lng: parseFloat(row[9])
                },
                kmh: row[12],
                location: utils.decodeUnicode(row[20]).replace(/"/g, '')
            };
            points.push(point);
        }
        vehicle.points = points;
        vehicles.push(vehicle);
    }
    return vehicles;
}

function validation(res) {
    if (res.body === 'LOGOUT\n' || !res) {
        return Promise.reject({status: 401, msg: 'No se puede acceder al servicio.'});
    }
    return utils.parseXML(res.body).then(setFormat);
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
                return Promise.reject(err);
            });
        }
    };
};