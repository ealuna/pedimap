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

        },
        despacho_generico: (fecha_inicial = new Date(), fecha_final = new Date(),ruta = null) => {
            return sequelize.query(
                'EXEC [RR].[despacho_generico] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @ruta = :ruta',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, ruta: ruta},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        despacho_linea: (fecha_inicial = new Date(), fecha_final = new Date(),ruta = null) => {
            return sequelize.query(
                'EXEC [RR].[despacho_linea] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @ruta = :ruta',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, ruta: ruta},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        despacho_proveedor: (fecha_inicial = new Date(), fecha_final = new Date(),ruta = null) => {
            return sequelize.query(
                'EXEC [RR].[despacho_proveedor] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @ruta = :ruta',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, ruta: ruta},
                    type: sequelize.QueryTypes.SELECT
                });
        }
    };
};

