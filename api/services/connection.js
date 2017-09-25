/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

const sequelize = require('sequelize');
const config = require('../../config/database');

const oriunda = new sequelize(config.ORIUNDA);
const terranorte = new sequelize(config.TERRANORTE);
//const pruebas = new sequelize(config.HOME);

module.exports = {
    ORIUNDA: oriunda,
    TERRANORTE: terranorte
    //HOME: pruebas
};