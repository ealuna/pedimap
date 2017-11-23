/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

"use strict";

const jwt = require('jsonwebtoken');

const config = require('../../config/crypto.json');
const connection = require('../services/connection');
const Promise = require('bluebird');

//const secretOrKey = 'EvilSecret';

module.exports = name => {

    const models = connection[name].models;
    const secret = config[name].SECRET_KEY;

    return {
        create: function (req, res) {
            const data = req.body;

            if (data.clave !== data.confirmar) {
                return res.status(401).json({err: 'Las contraseñas son distintas'});
            }

            delete data.confirmar;

            models.usuarios.create(data).then(user => {
                res.status(200).json({user: user.toJSON()});
            }).catch(err => {
                res.status(401).json({err: err});
            });

        },
        /*massive: function (req, res) {
         const data = req.body;

         for (let i = 0; i < data.length; i++) {
         if (data[i].clave !== data[i].confirmar) {
         return res.status(401).json({err: 'Las contraseñas son distintas'});
         }

         delete  data[i].confirmar;

         models.usuarios.create(data[i]).then(user => {
         }).catch(err => {
         res.status(401).json({err: err});
         });
         }
         res.json({message: 'Success !!!!'});
         },*/
        findAll: function (options) {
            return models.usuarios.findAll(options);
        },
        AuthenticateApi: function (req, res) {

            const data = req.body;

            if (!data.usuario && !data.clave) {
                res.status(401).json({message: "Ingrese los datos correctamente."});
            }

            models.usuarios.findAll({where: {usuario: data.usuario}}).then(usuario => {
                if (usuario && usuario.length) {
                    usuario[0].comparePassword(data.clave).then(match => {
                        if (!match) {
                            //res.status(401).json({message: "Contraseña incorrecta."});
                            res.status(401).send('Contraseña incorrecta.');
                        } else {
                            const payload = usuario[0].toJSON();
                            const token = jwt.sign(payload, secret);
                            delete payload.nrousua;
                            //res.cookie('SESSIONID', token, {httpOnly: true});
                            res.status(200).json({message: "Ok", usuario: payload, token: `JWT ${token}`});
                        }
                    }).catch(err => {
                        res.status(500).json({message: err});
                    });
                } else {
                    res.status(401).send('Usuario no encontrado.');
                    //res.status(401).json({message: "Usuario no encontrado."});
                }
            });
        },
        AuthenticateWeb: function (req, res, next) {
            const data = req.body;

            if (!data.usuario && !data.clave) {
                return res.redirect(400, '/terranorte/login');
            }

            models.usuarios.findAll({where: {usuario: data.usuario}}).then(usuario => {
                if (usuario && usuario.length) {
                    usuario[0].comparePassword(data.clave).then(match => {
                        if (!match) {
                            return res.redirect(400, '/terranorte/login');
                            //return res.redirect(200, '/terranorte/login');
                        }
                        const payload = usuario[0].toJSON();
                        const token = jwt.sign(payload, secret);
                        res.cookie('SESSIONID', token, {httpOnly: true});

                        //return next();
                        //res.status(200).send();
                        res.redirect(302, '/terranorte/login')

                    }).catch(err => {
                        //res.redirect(500, '/terranorte/login');
                        console.log(err);
                    });
                    return;
                }
                return res.redirect(400, '/terranorte/login');

            });
        }
    }
};