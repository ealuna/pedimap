/**
 * Created by Edward Luna Noriega on 17/08/17.
 */

const connections = require('../services/connection').getConnections();

let keys = Object.keys(connections);
let models = {};

for (let i = 0; i < keys.length; i++) {
    let name = keys[i];
    models[name] = require('../models/usuario')(connections[name]);
}

module.exports = {
    create: function (req, res) {
        let name = req.body.empresa.toString();
        if (req.body.password !== req.body.confirmPassword) {
            return res.json(401, {err: 'Las contraseñas ingresadas son distintas'});
        } else {
            models[name].create(req.body, function (err, user) {
                if (err) {
                    return res.json(err.status, {err: err});
                } else if (user) {
                    res.json(200, {
                        user: user.toJSON(),
                        token: jwToken.generateToken({id: user.get('nrousua')})
                    });
                }
            });
        }
    }
};
