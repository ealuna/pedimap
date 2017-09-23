/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";


module.exports = function (sequelize, DataTypes) {
    const fleteros = sequelize.define("fleteros", {
        idcliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nomcli: {
            type: DataTypes.STRING
        },
        chapa: {
            type: DataTypes.STRING
        },
        propio: {
            type: DataTypes.BOOLEAN
        },
        idclifac: {
            type: DataTypes.INTEGER
        }
    }, {
        schema: 'PUB',
        timestamps: false,
        freezeTableName: true,
    });

    fleteros.associate = function (models) {
        fleteros.hasOne(models.clientes, {as: 'clientes'});
    }
    fleteros.associate = function (models) {
        fleteros.hasOne(models.clientes, {as: 'clientes'});
    }
};