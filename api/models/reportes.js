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

        },
        indicador1: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [RP].[indicador1] @fechaini = :fecdesde, @fechahas = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        indicador2: (fecdesde, fechasta) => {

            return sequelize.query(
                'EXEC [RP].[indicador2] @fechaini= :fecdesde, @fechahas = :fechasta',
                {
                    nest: true,
                    replacements: {fecdesde: fecdesde, fechasta: fechasta},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        despacho_proveedor: (fecha_inicial = new Date(), fecha_final = new Date()) => {

            return sequelize.query(
                'EXEC [RP].[general_proveedor] @fecha_inicial= :fecha_inicial, @fecha_final = :fecha_final',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        consolidado_general: (fecha_inicial = new Date(), fecha_final = new Date(),fletero = null) => {
        return sequelize.query(
            'EXEC [RP].[consolidado_general] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @fletero = :fletero',
            {
                nest: true,
                replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, fletero: fletero},
                type: sequelize.QueryTypes.SELECT
            });
    }
    };
};