/**
 * Created by Edward Luna Noriega on 25/08/17.
 */
//const DataTypes = require('sequelize').DataTypes;

module.exports = function (sequelize, DataTypes)  {
    return sequelize.define(
        'mascstock',
        {
            codprov: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            nromov: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            tipomov: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            serie: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            idDepo: {
                type: DataTypes.INTEGER
            }
        },
        {
            schema: 'dbo',
            timestamps: false,
            freezeTableName: true,
            hooks: {},
            defaultScope: {
                /*attributes: {
                    exclude: ['serie', 'codprov', 'tipomov'],
                    include: [{
                        model: mascara,
                        where: {
                            seriepla: {$col: 'planilla.serie'},
                            codprov: {$col: 'planilla.codprov'},
                            nropla: {$col: 'planilla.nromov'},
                            tipopla: {$col: 'planilla.tipomov'}
                        }
                    }]
                },*/
                where: {
                    tipomov: 'CAR',
                    //fecentre: sequelize.fn('CONVERT', sequelize.literal('DATE'), sequelize.fn('GETDATE')),
                    anulado: false
                }
            }
        }
    )
        ;
    /*planilla.prototype.toJSON = function () {
     let obj = this.get();
     delete obj.clave;
     delete obj.sha1;
     return obj;
     }; */
};

