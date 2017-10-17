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
        },
        reporte: (req, res) => {
            const data = req.body;

            if(!data.fecha || !data.fletero) {
                return res.status(400).json({err: 'Los campos fecha y fletero son requeridos.'});
            }

            rutas.reporte(data.fecha, data.fletero).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};
