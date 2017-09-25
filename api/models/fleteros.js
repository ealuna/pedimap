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
        /* idclifac: {
         type: DataTypes.INTEGER,
         references: {
         model: 'clientes',
         key: 'idcliente'
         }
         }*/
    }, {
        //schema: 'PUB',
        schema: 'dbo',
        timestamps: false,
        freezeTableName: true,
        defaultScope: {
            where: {
                anulado: false
            }
        }
    });

  /*  fleteros.prototype.toJSON = function () {
        const data = this.get();
        delete data.idclifac;
        data.cliente = data.cliente.get();
        const planillas = [];
        data.planillas.forEach(function (value) {
            planillas.push(value.get());
        });
        data.planillas = planillas;
        return data;
    };*/

    fleteros.associate = function (models) {
        fleteros.belongsTo(models.clientes, {foreignKey: 'idclifac'});
        fleteros.hasMany(models.mascstock, {foreignKey: 'idcliente', as: 'planillas'});
        //fleteros.hasMany(models.mascara);
    };

    /*fleteros.associate = function (models) {
     fleteros.hasOne(models.clientes, {as: 'clientes'});
     }*/
    return fleteros;
};