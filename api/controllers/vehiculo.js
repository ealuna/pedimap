/**
 * Created by Zerufo on 28/09/2017.
 */

"use strict";

const vehicle = require('../models/vehiculo');

module.exports = name => {
    return {
        points: (device, next) => {
            vehicle(name).getPoints(device.id, device.limit).then(result => {
                next(null, result);
            }).catch(err => {
                next(err, null);
            });
        }
    };
};