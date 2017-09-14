/**
 * Created by Edward Luna Noriega on 21/08/17.
 */
const DataTypes = require('sequelize').DataTypes;

module.exports = function (sequelize) {
    let ruta = sequelize.define(
        'espacial',
        {
            idruta: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            coordenadas: {
                type: DataTypes.STRING,
                field: sequelize.literal('[coord].ToString()')
            },
            coord: {
                type: DataTypes.STRING
            },
            xcoord: {
                type: DataTypes.REAL
            },
            ycoord: {
                type: DataTypes.REAL
            }
        },
        {
            schema: 'PUB',
            timestamps: false,
            freezeTableName: true
        }
    );
    ruta.prototype.toJSON = function () {
        let arrayCords = [];
        let coords = this.getDataValue('coordenadas').match(/\([^\(\)]+\)/g);
        if (coords !== null) {
            for (let i = 0; i < coords.length; i++) {
                let coord = coords[i].match(/-?\d+\.?\d*/g);
                if (coord !== null) {
                    for (let j = 0; j < coord.length; j += 2) {
                        arrayCords.push(
                            {
                                lng: Number(coord[j]),
                                lat: Number(coord[j + 1])
                            }
                        );
                    }
                }
            }
        }
        return {
            idruta: this.getDataValue('idruta'),
            coord: arrayCords,
            center: {
                lng: this.getDataValue('xcoord'),
                lat: this.getDataValue('ycoord')
            }
        };
    };
    return ruta;
};
