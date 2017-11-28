/**
 * Created by Edward Luna Noriega on 17/11/17.
 */

"use strict";

const model = require('../models/vendedor');

module.exports = name => {

    const vendedor = model(name);

    return {
        despacho: (req, res) => {
            const data = req.body;

            if(!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({err: 'Debe de insertar un rango de fechas válido.'});
            }

            vendedor.despacho(data.fecha_inicial, data.fecha_final, data.vendedor).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_generico: (req, res) => {
            const data = req.body;

            if(!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({err: 'Debe de insertar un rango de fechas válido.'});
            }

            vendedor.despacho_generico(data.fecha_inicial, data.fecha_final, data.vendedor).then(result => {
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

            vendedor.despacho_linea(data.fecha_inicial, data.fecha_final, data.vendedor).then(result => {
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

            vendedor.despacho_proveedor(data.fecha_inicial, data.fecha_final, data.vendedor).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};
