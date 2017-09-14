/**
 * Created by Edward Luna Noriega on 25/08/17.
 */
const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
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
            },
            idTransporte: {
                type: DataTypes.INTEGER,
                field: 'idcliente'
            }
        },
        {
            schema: 'PUB',
            timestamps: false,
            freezeTableName: true,
            hooks: {},
            defaultScope: {
                attributes: {
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
                },
                where: {
                    tipomov: 'CAR',
                    fecentre: sequelize.fn('CONVERT', sequelize.literal('DATE'), sequelize.fn('GETDATE')),
                    anulado: 0
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

