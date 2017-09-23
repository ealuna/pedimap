/**
 * Created by Edward Luna Noriega on 18/08/17.
 */
//const DataTypes = require('sequelize').DataTypes;
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

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
            hash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descrip: {
                type: DataTypes.STRING,
            },
            activo: {
                type: DataTypes.BOOLEAN
            },
            idSucur: {
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
                    console.log("HOLA________________")
                    return bcrypt.genSaltAsync(10).then(salt => {
                        return bcrypt.hashAsync(user.clave, salt).then( hash => {
                            user.hash = salt;
                            user.clave = hash;
                            return Promise.resolve();
                        });
                    });
                }
            }
        }
    );
    usuario.prototype.toJSON = function () {
        const obj = this.get();
        delete obj.clave;
        delete obj.hash;
        return obj;
    };
    usuario.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.clave);
    };
    return usuario;
};
