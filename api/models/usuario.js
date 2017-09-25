/**
 * Created by Edward Luna Noriega on 18/08/17.
 */

"use strict";

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define('usuarios', {
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
            descrip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            tipousua: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            codigo: {
                type: DataTypes.INTEGER,
                allowNull: false
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
                    return bcrypt.genSaltAsync(10).then(salt => {
                        return bcrypt.hashAsync(user.clave, salt).then(hash => {
                            user.clave = hash;
                            return Promise.resolve();
                        });
                    });
                }
            }
        }
    );
    usuario.prototype.toJSON = function () {
        const data = this.get();
        delete data.clave;
        return data;
    };
    usuario.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.clave);
    };
    return usuario;
};
