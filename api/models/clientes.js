/**
 * Created by Edward Luna Noriega on 22/09/17.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    sequelize.define('clientes', {
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
    });
};