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
    };
};