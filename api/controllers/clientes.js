/**
 * Created by Edward Luna Noriega on 29/09/17.
 */

"use strict";

const model = require('../models/clientes');


module.exports = name => {

    const clientes = model(name);

    return {
        today: (req, res) => {
            //const clientes = model(name);
            clientes.today().then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho: (req, res) => {

            const data = req.body;

            clientes.despacho(data.fecha, data.fletero).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });

        },
        reporteDespacho: (req, res) => {
            const data = req.body;
            clientes.reporteDespacho(data.fechainicial, data.fechafinal, data.fletero).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });

        },

        entrega: (data, fn) => {

            clientes.entrega(data.codprov, data.tipopla, data.seriepla, data.nropla, data.cliente, data.resultado).then(result => {
                fn(null, result);
            }).catch(err => {
                fn(err, null);
            });

        },
        sinpedido: (req, res) => {
            //const clientes = model(name);
            clientes.sinpedido().then(result => {
                res.status(200).json(result);
            }).catch(err => {
                console.log(err)
                res.status(500).json({error: err});
            });
        },
        all: (req, res) => {
            //const clientes = model(name);
            clientes.all().then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        pedidos: (req, res) => {

            const data = req.body;

            if(!data.cliente){
                return res.status(400).json({err: 'El campo cliente es requerido'});
            }

            clientes.pedidos(data.cliente).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        pedidos_detalle: (req, res) => {

            const data = req.body;

            if(!data.pedido){
                return res.status(400).json({err: 'El campo pedido es requerido'});
            }

            clientes.pedidos_detalle(data.pedido).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        documentos: (req, res) => {

            const data = req.body;

            if(!data.cliente){
                return res.status(400).json({err: 'El campo cliente es requerido'});
            }

            clientes.documentos(data.cliente).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};