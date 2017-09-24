/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

//const connections = require('../services/connection').getConnections();
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
                    user: user.toJSON(),
                    token: jwt.sign({id: user.get('nrousua')}, secretOrKey)
                });
            }).catch(err => {
                res.status(401).json({err: err});
            });
        },
        authenticate: function (req, res) {
            models.usuarios.findAll({where: {usuario: req.body.usuario}}).then(usuario => {
                if (usuario[0]) {
                    usuario[0].comparePassword(req.body.clave).then(match => {
                        if (!match) {
                            res.status(401).json({message: "Contraseña incorrecta."});
                        } else {
                            const payload = {id: usuario[0].nrousua};
                            const token = jwt.sign(payload, secretOrKey);
                            res.cookie('token', token, {httpOnly: true});
                            res.json({message: "Ok", token: token});
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