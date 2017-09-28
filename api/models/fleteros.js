/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";

const connection = require('../services/connection');

module.exports = name => {
    return {
        find: (fletero, fecha) => {
            const sequelize = connection[name];
            return sequelize.query(
                'EXEC [SP].[fletero] @fecha = :fecha, @numcam = :fletero',
                {
                    nest: true,
                    replacements: {fecha: fecha, fletero: fletero},
                    type: sequelize.QueryTypes.SELECT
                });
        }
    };
};


/*module.exports = function (sequelize, DataTypes) {
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
 }*/