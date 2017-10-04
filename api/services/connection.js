/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

const sequelize = require('sequelize');
const config = require('../../config/database');
const models = require('../models');

const oriunda = models(new sequelize(config.ORIUNDA));
const terranorte = models(new sequelize(config.TERRANORTE));
const pruebas = models(new sequelize(config.HOME));

module.exports.ORIUNDA = oriunda;
module.exports.TERRANORTE = terranorte;
module.exports.HOME = pruebas;