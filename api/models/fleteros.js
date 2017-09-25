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
        }
    }, {
        schema: 'PUB',
        //schema: 'dbo',
        timestamps: false,
        freezeTableName: true,
        defaultScope: {
            where: {
                anulado: false
            }
        }
    });

    fleteros.associate = function (models) {
        fleteros.belongsTo(models.clientes, {foreignKey: 'idclifac'});
        fleteros.hasMany(models.mascstock, {foreignKey: 'idcliente', as: 'planillas'});
        //fleteros.hasMany(models.mascara);
    };

    return fleteros;
};