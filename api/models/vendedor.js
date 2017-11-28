/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";

const connection = require('../services/connection');

module.exports = name => {

    const sequelize = connection[name];

    return {
        despacho: (fecha_inicial = new Date(), fecha_final = new Date(),vendedor = null) => {
            return sequelize.query(
                'EXEC [RP].[despacho_vendedor] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @vendedor = :vendedor',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, vendedor: vendedor},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        despacho_generico: (fecha_inicial = new Date(), fecha_final = new Date(),vendedor = null) => {
            return sequelize.query(
                'EXEC [RV].[despacho_generico] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @vendedor = :vendedor',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, vendedor: vendedor},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        despacho_linea: (fecha_inicial = new Date(), fecha_final = new Date(),vendedor = null) => {
            return sequelize.query(
                'EXEC [RV].[despacho_linea] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @vendedor = :vendedor',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, vendedor: vendedor},
                    type: sequelize.QueryTypes.SELECT
                });
        },
        despacho_proveedor: (fecha_inicial = new Date(), fecha_final = new Date(),vendedor = null) => {
            return sequelize.query(
                'EXEC [RV].[despacho_proveedor] @fecha_inicial = :fecha_inicial, @fecha_final = :fecha_final, @vendedor = :vendedor',
                {
                    nest: true,
                    replacements: {fecha_inicial: fecha_inicial, fecha_final: fecha_final, vendedor: vendedor},
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