/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

"use strict";

const jwt = require('jsonwebtoken');

const config = require('../../config/crypto.json');
const connection = require('../services/connection');

//const secretOrKey = 'EvilSecret';

module.exports = name => {
    return {
        create: function (req, res) {
            const data = req.body;
            const models = connection[name].models;

            if (data.clave !== data.confirmar) {
                return res.status(401).json({err: 'Las contraseñas son distintas'});
            }

            delete  data.confirmar;

            models.usuarios.create(data).then(user => {
                res.status(200).json({user: user.toJSON()});
            }).catch(err => {
                res.status(401).json({err: err});
            });

        },
        massive: function (req, res) {
            const data = req.body;
            const models = connection[name].models;

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
        },
        findAll: function (options) {
            const models = connection[name].models;
            return models.usuarios.findAll(options);
        },
        AuthenticateApi: function (req, res) {

            const data = req.body;
            const models = connection[name].models;
            const secret = config[name].SECRET_KEY;

            if(!data.usuario && !data.clave){
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
        AuthenticateWeb: function (req, res) {
            const data = req.body;
            const models = connection[name].models;
            const secret = config[name].SECRET_KEY;

            if(!data.usuario && ! data.clave){
                res.render('login', {message: "Ingrese los datos correctamente."});
            }

            models.usuarios.findAll({where: {usuario: data.usuario}}).then(usuario => {
                if (usuario && usuario.length) {
                    usuario[0].comparePassword(data.clave).then(match => {
                        if (!match) {
                            //res.status(401).json({message: "Contraseña incorrecta."});
                            res.render('login', {message: "Contraseña incorrecta."});
                        } else {
                            const payload = usuario[0].toJSON();
                            const token = jwt.sign(payload, secret);
                            res.cookie('SESSIONID', token, {httpOnly: true});
                            res.render('login', {message: "Contraseña incorrecta."});
                            //res.status(200).json({message: "Ok", token: `JWT ${token}`});
                        }
                    }).catch(err => {
                        res.render('login', {message: "Ha ocurrido un error."});
                        console.log(err);
                        //res.status(500).json({message: err});
                    });
                } else {
                    res.render('login', {message: "El usuario ingresado no existe."});
                    //res.status(401).json({message: "Usuario no encontrado."});
                }
            });
        }
    }
};