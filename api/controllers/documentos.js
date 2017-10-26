/**
 * Created by Edward Luna Noriega on 19/10/17.
 */


"use strict";

const model = require('../models/documento');


module.exports = name => {

    const documentos = model(name);

    return {
        pedidos: (req, res) => {
            const data = req.body;

            if(!data.fecha){
                res.status(400).json({msg: 'El campo fecha es requerido'});
            }

            documentos.pedidos(data.fecha, data.fletero, data.vendedor, data.supervisor).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        entregas: (req, res) => {
            const data = req.body;

            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            documentos.entregas(data.fecha).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        entregas_horas: (req, res) => {
            const data = req.body;

            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            documentos.entregas_horas(data.fecha).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};