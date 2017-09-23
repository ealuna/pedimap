/**
 * Created by Edward Luna Noriega on 13/09/17.
 */

"use strict";

const utils = require('../services/utils');

module.exports = (dataset) => {
    const fleet = [];
    const data = utils.dataArray(dataset);
    for (let i = 0; i < data.length; i++) {
        if (utils.rowValidation(data[i])) {
            continue;
        }
        const row = utils.splitArray(data[i].P);
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
};




