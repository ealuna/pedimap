/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

"use strict";

const request = require('../services/request');
const fleet = require('../models/flota');

module.exports = (name) => {
    return {
        list: (group) => {
            return request(name).fleet(group).then(data => {
                return fleet(data);
            });
        }
    };
};