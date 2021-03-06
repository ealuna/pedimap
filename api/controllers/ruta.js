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
        },
        despacho_generico: (req, res) => {
            const data = req.body;

            if(!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({err: 'Debe de insertar un rango de fechas válido.'});
            }

            rutas.despacho_generico(data.fecha_inicial, data.fecha_final, data.ruta).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_linea: (req, res) => {
            const data = req.body;

            if(!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({err: 'Debe de insertar un rango de fechas válido.'});
            }

            rutas.despacho_linea(data.fecha_inicial, data.fecha_final, data.ruta).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_proveedor: (req, res) => {
            const data = req.body;

            if(!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({err: 'Debe de insertar un rango de fechas válido.'});
            }

            rutas.despacho_proveedor(data.fecha_inicial, data.fecha_final, data.ruta).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};
