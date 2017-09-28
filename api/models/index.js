/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";

const path = require("path");
const files = [
    //'planilla',
    //'articulos',
    //'documento',
    //'detalle',
    //'vendedor',
    //'fleteros',
    //'clientes',
    'usuario'
];


module.exports = (sequelize) => {
    files.forEach(function (file) {
        sequelize.import(path.join(__dirname, file));
    });
    Object.keys(sequelize.models).forEach(function(model) {
        if ("associate" in sequelize.models[model]) {
            sequelize.models[model].associate(sequelize.models);
        }
    });
    return sequelize.models;
};





