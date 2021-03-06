/**
 * Created by Edward Luna Noriega on 22/09/17.
 */
"use strict";

const connection = require('../services/connection');

module.exports = name => {

    const sequelize = connection[name];

    return {
        today: function () {

            return sequelize.query(
                'EXEC [SP].[despacho] @fecha = :fecha',
                {
                    nest: true,
                    replacements: {fecha: new Date()},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        despacho: function (fecha, fletero = null) {
            return sequelize.query(
                'EXEC [SP].[despacho] @fecha = :fecha, @fletero = :fletero',
                {
                    nest: true,
                    replacements: {fecha: fecha, fletero: fletero},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        reporteDespacho: function (fechainicial, fechafinal, fletero = null) {
            return sequelize.query(
                'EXEC [RP].[fleteros_clientes] @fecha_inicial = :fechainicial, @fecha_final = :fechafinal, @fletero = :fletero',
                {
                    nest: true,
                    replacements: {fechainicial: fechainicial, fechafinal: fechafinal, fletero: fletero},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        entrega: function (codprov, tipopla, seriepla, nropla, idcliente, resultado) {

            return sequelize.query(
                'EXEC [SP].[resultado] @codprov = :codprov, @tipopla = :tipopla, @seriepla = :seriepla, @nropla = :nropla, @idcliente = :idcliente, @resultado = :resultado',
                {
                    nest: true,
                    replacements: {
                        codprov: codprov,
                        tipopla: tipopla,
                        seriepla: seriepla,
                        nropla: nropla,
                        idcliente: idcliente,
                        resultado: resultado
                    },
                    type: sequelize.QueryTypes.SELECT
                });

        },
        sinpedido: function () {

            return sequelize.query(
                `EXEC [SP].[cliente] @fecha = :fecha, @pedido = :pedido`,
                {
                    nest: true,
                    replacements: {fecha: new Date(), pedido: 0},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        all: () => {
            const sequelize = connection[name];
            return sequelize.query(
                'EXEC [SP].[despacho] @fecha = :fecha',
                {
                    nest: true,
                    replacements: {fecha: new Date()},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        pedidos: function (cliente) {

            return sequelize.query(
                `EXEC [PD].[pedido_pendiente] @cliente = :cliente`,
                {
                    nest: true,
                    replacements: {cliente: cliente},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        pedidos_detalle: function (pedido) {

            return sequelize.query(
                `EXEC [PD].[detalle_pendiente] @pedido = :pedido`,
                {
                    nest: true,
                    replacements: {pedido: pedido},
                    type: sequelize.QueryTypes.SELECT
                });

        },
        documentos: function (cliente) {

            return sequelize.query(
                `EXEC [RP].[despacho] @cliente = :cliente`,
                {
                    nest: true,
                    replacements: {cliente: cliente},
                    type: sequelize.QueryTypes.SELECT
                });

        }
    };
};


/*module.exports = function (sequelize, DataTypes) {
 return sequelize.define(
 'clientes', {
 idcliente: {
 type: DataTypes.INTEGER,
 primaryKey: true
 },
 nomcli: {
 type: DataTypes.STRING
 },
 numcuit: {
 type: DataTypes.STRING
 },
 domicli: {
 type: DataTypes.STRING
 },
 entcalle1: {
 type: DataTypes.STRING
 },
 comentario: {
 type: DataTypes.STRING
 },
 XCoord: {
 type: DataTypes.INTEGER
 },
 YCoord: {
 type: DataTypes.INTEGER
 },
 telefos: {
 type: DataTypes.STRING
 },
 movil: {
 type: DataTypes.STRING
 },
 email: {
 type: DataTypes.STRING
 },
 categoria: {
 type: DataTypes.STRING
 },
 anulado: {
 type: DataTypes.BOOLEAN
 }
 }, {
 schema: 'PUB',
 timestamps: false,
 freezeTableName: true,
 defaultScope: {
 where: {
 anulado: false
 }
 }
 });
 }*/