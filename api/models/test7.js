/**
 * Created by Edward Luna Noriega on 25/08/17.
 */
const DataTypes = require('sequelize').DataTypes;
const as = require('../services/connection').getConnections.terranorte;
const p = require('./planilla')(as);

as.sync().then(
    function () {
        p.findAll().then(
            (a) => {

                console.log(a);
            }

        )

    }
);
