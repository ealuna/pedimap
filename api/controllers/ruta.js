/**
 * Created by Edward Luna Noriega on 02/10/17.
 */

"use strict";

const model = require('../models/ruta');

module.exports = name => {

    const rutas = model(name);

    return {
        today: (req, res) => {
            rutas.today().then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};
