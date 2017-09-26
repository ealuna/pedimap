/**
 * Created by Edward Luna Noriega on 25/08/17.
 */

"use strict";

module.exports = function (sequelize, DataTypes) {
    const mascara = sequelize.define('mascara', {
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
        }
    }, {
        schema: 'PUB',
        timestamps: false,
        freezeTableName: true
    });

    mascara.associate = function (models) {
        mascara.hasMany(models.lineas, {foreignKey: 'letra'});
        mascara.belongsTo(models.fleteros, {foreignKey: 'numcam'});
        mascara.belongsTo(models.perscom, {foreignKey: 'c_perso'});
        mascara.belongsTo(models.clientes, {foreignKey: 'idcliente'});
        mascara.addScope('with_lineas', {
            attributes: {
                include: [[sequelize.literal('([mascara].[netogra] + [mascara].[nograva] + [mascara].[iva1] + [mascara].[iva2] + [mascara].[per3337] + [mascara].[per212] + [mascara].[perib] + [mascara].[internos])'), 'total']],
                exclude: ['numcam', 'c_perso', 'idcliente', 'letra']
            },
            include: [{
                model: models.lineas,
                required: true,
                on: {
                    con1: sequelize.where(sequelize.col("mascara.letra"), "=", sequelize.col("lineas.letra")),
                    con2: sequelize.where(sequelize.col("mascara.nrodoc"), "=", sequelize.col("lineas.nrodoc")),
                    con3: sequelize.where(sequelize.col("mascara.iddocumento"), "=", sequelize.col("lineas.iddocumento")),
                    con4: sequelize.where(sequelize.col("mascara.serie"), "=", sequelize.col("lineas.serie"))
                },
                include: [{
                    model: models.articulos,
                    required: true,
                    attributes:{
                        exclude: ['codgene', 'codmarca', 'codprecan', 'codpreres', 'resto', 'codbarra', 'codbarrauni']
                    }
                }],
                attributes: {
                    include: [[sequelize.literal('(((([lineas].[resto]/CONVERT(DECIMAL, [lineas->articulo].[resto])) + [lineas].[cant]) * ([lineas].[precio] * ((100 - [lineas].[bonif])/100))) + [lineas].[iva1] + [lineas].[iva2] + [lineas].[per3337] + [lineas].[per212] + [lineas].[perib] + [lineas].[internos])'), 'total']],
                    exclude: ['letra', 'iddocumento', 'serie', 'nrodoc']
                },
                where: {
                    fechafac: sequelize.fn('CONVERT', sequelize.literal('DATE'), sequelize.fn('GETDATE'))
                }
            }, {
                model: models.clientes,
                required: true,
                attributes: ['idcliente', 'nomcli']
            }, {
                model: models.perscom,
                required: true,
                attributes: ['c_perso', 'd_perso']
            }, {
                model: models.fleteros,
                attributes: ['idcliente', 'nomcli'],
                required: false
            }],
            where: {
                fechafac: sequelize.fn('CONVERT', sequelize.literal('DATE'), sequelize.fn('GETDATE')),
                anulado: false
            }
        });
    };

    return mascara;
};