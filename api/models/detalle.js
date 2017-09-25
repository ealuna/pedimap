/**
 * Created by Edward Luna Noriega on 25/09/17.
 */

"use strict";

module.exports = function (sequelize, DataTypes) {
    const lineas = sequelize.define('lineas', {
        letra: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nrodoc: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        iddocumento: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        serie: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idLinea: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        codart: {
            type: DataTypes.INTEGER
        },
        cant: {
            type: DataTypes.INTEGER
        },
        resto: {
            type: DataTypes.INTEGER
        },
        bonif: {
            type: DataTypes.FLOAT
        },
        precio: {
            type: DataTypes.FLOAT
        },
        iva1: {
            type: DataTypes.FLOAT
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

    lineas.associate = function (models) {
        lineas.belongsTo(models.articulos, {foreignKey: 'codart'})
    };

    return lineas;
};