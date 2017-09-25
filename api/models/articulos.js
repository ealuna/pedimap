/**
 * Created by Edward Luna Noriega on 25/09/17.
 */

"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('articulos', {
        codart: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        descrip: {
            type: DataTypes.STRING
        },
        codgene: {
            type: DataTypes.INTEGER
        },
        codmarca: {
            type: DataTypes.INTEGER
        },
        codprecan: {
            type: DataTypes.STRING
        },
        codpreres: {
            type: DataTypes.STRING
        },
        resto: {
            type: DataTypes.INTEGER
        },
        codbarra: {
            type: DataTypes.STRING
        },
        codbarrauni: {
            type: DataTypes.STRING
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
};