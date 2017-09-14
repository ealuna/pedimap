/**
 * Created by Edward Luna Noriega on 18/08/17.
 */
//const DataTypes = require('sequelize').DataTypes;
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    let usuario = sequelize.define(
        'usuarios',
        {
            nrousua: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            usuario: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            clave: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sha1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            activo: {
                type: DataTypes.BOOLEAN
            },
            idSucur: {
                type: DataTypes.INTEGER
            },
            coduser: {
                type: DataTypes.INTEGER
            },
            codtipusua: {
                type: DataTypes.INTEGER
            }
        },
        {
            schema: 'PUB',
            timestamps: true,
            freezeTableName: true,
            createdAt: 'fecalta',
            updatedAt: 'fhlog',
            hooks: {
                beforeCreate: (user, options) => {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            return next(err);
                        } else {
                            bcrypt.hash(user.clave, salt, function (err, hash) {
                                if (err) {
                                    return next(err);
                                } else {
                                    user.encryptedPassword = hash;
                                }
                            });
                        }
                    })
                }

            }
        }
    );
    usuario.prototype.toJSON = function () {
        let obj = this.get();
        delete obj.clave;
        delete obj.sha1;
        return obj;
    };
    return usuario;
};
