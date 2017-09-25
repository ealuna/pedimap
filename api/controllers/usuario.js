/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

"use strict";

const jwt = require('jsonwebtoken');
const secretOrKey = 'EvilSecret';

module.exports = (models) => {
    return {
        create: function (req, res) {
            const data = req.body;
            if (data.clave !== data.confirmar) {
                return res.status(401).json({err: 'Las contraseñas son distintas'});
            }
            delete  data.confirmar;
            models.usuarios.create(data).then(user => {
                res.status(200).json({
                    user: user.toJSON()
                    //token: jwt.sign({id: user.get('nrousua')}, secretOrKey)
                });
            }).catch(err => {
                res.status(401).json({err: err});
            });
        },
        massive: function (req, res) {
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
        },
        authenticate: function (req, res) {
            models.usuarios.findAll({where: {usuario: req.body.usuario}}).then(usuario => {
                if (usuario && usuario.length) {
                    usuario[0].comparePassword(req.body.clave).then(match => {
                        if (!match) {
                            res.status(401).json({message: "Contraseña incorrecta."});
                        } else {
                            const payload = {id: usuario[0].nrousua};
                            const token = jwt.sign(payload, secretOrKey);
                            res.cookie('SESSIONID', token, {httpOnly: true});
                            res.status(200).json({message: "Ok", token: `JWT ${token}`});
                        }
                    }).catch(err => {
                        res.status(500).json({message: err});
                    });
                } else {
                    res.status(401).json({message: "Usuario no encontrado."});
                }
            });
        }
    }
};