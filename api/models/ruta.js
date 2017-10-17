/**
 * Created by Edward Luna Noriega on 02/10/17.
 */

"use strict";

const connection = require('../services/connection');

module.exports = name => {

    const sequelize = connection[name];

    return {
        today: () => {

            return sequelize.query(
                'EXEC [SP].[ruta] @fecha = :fecha',
                {
                    nest: true,
                    replacements: {fecha: new Date()},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        reporte: (fecha, fletero) => {

            return sequelize.query(
                'EXEC [SP].[rutas] @fecha = :fecha, @fletero = :fletero',
                {
                    nest: true,
                    replacements: {fecha: fecha, fletero: fletero},
                    type: sequelize.QueryTypes.SELECT
                });

        }
    };
};

