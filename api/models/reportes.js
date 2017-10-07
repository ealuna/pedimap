/**
 * Created by Edward Luna Noriega on 06/10/17.
 */



const connection = require('../services/connection');

module.exports = name => {

    const sequelize = connection[name];

    return {
        cobertura_p: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [SP].[visita_programada] @fechainicial = :fecdesde, @fechafinal = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        cobertura_r: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [SP].[visita_realizada] @fechainicial = :fecdesde, @fechafinal = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        ventas: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [SP].[venta_neta] @fechainicial = :fecdesde, @fechafinal = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        empleados: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [SP].[hombre_empleado] @fechainicial = :fecdesde, @fechafinal = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        }
    };
};