/**
 * Created by Edward Luna Noriega on 25/09/17.
 */

"use strict";


module.exports = function (sequelize, DataTypes) {
    const perscom = sequelize.define('perscom', {
        c_perso: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        d_perso: {
            type: DataTypes.STRING
        },
        idSucur: {
            type: DataTypes.INTEGER
        },
        idEsq: {
            type: DataTypes.INTEGER
        },
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
    perscom.associate = function (models) {
        perscom.belongsTo(models.perscom, {as: 'supervisor', foreignKey: 'c_super'});
        //lineas.belongsTo(models.articulos)
    }


};
