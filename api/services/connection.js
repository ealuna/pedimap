/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

const sequelize = require('sequelize');
//const fs = require('fs');
//const path = require('path');

//const LOCATION = path.join(__dirname, '..', '..', 'config', 'database.json');
//const config = JSON.parse(fs.readFileSync(LOCATION, 'utf8'));
//const databases = Object.keys(config);
const config = require('../../config/database');

module.exports = (name) => {
    return new sequelize(config[name]);
};




/*
const terranorte = new sequelize(config.terranorte);
const oriunda = new sequelize(config.oriunda);

module.exports = {
    getDatabases: databases,
    getConnections: {
        terranorte: terranorte,
        oriunda: oriunda
    }
};
    */