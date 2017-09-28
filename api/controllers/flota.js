/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

"use strict";

const fleet = require('../models/flota');

module.exports = (name) => {
    return {
        group: (group, next) => {
            fleet(name).getGroup(group).then(result => {
                next(null, result);
            }).catch(err =>{
                next(err, null);
            });
        }
    };
};