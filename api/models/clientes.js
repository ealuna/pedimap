/**
 * Created by Edward Luna Noriega on 22/09/17.
 */
"use strict";

const dateformat = require('dateformat');

const connection = require('../services/connection');


module.exports = name => {

    const sequelize = connection[name];

    return {
        today: function() {
            //const sequelize = connection[name];
            return sequelize.query(
                'EXEC [SP].[despacho] @fecha = :fecha',
                {
                    nest: true,
                    replacements: {fecha: new Date()},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        sinpedido: function() {
            //const sequelize = connection[name];
            return sequelize.query(
                `EXEC [SP].[cliente] @fecha = :fecha, @pedido = :pedido`, 
                {
                    nest: true,
                    //replacements: {fecha: dateformat('dd/mm/yyyy'), pedido: 0},
                    replacements: {fecha: new Date(), pedido: 0},
                    //replacements: [new Date(), 0],
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