/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";

const model = require('../models/fleteros');


module.exports = name => {

    const fletero = model(name);

    return {
        find: (req, res) => {
            const data = req.body;

            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            fletero.find(data.fletero, data.fecha).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        render: (req, res) => {

            fletero.find(null, new Date()).then(result => {
                if (name === 'TERRANORTE')
                res.render('seguimiento', {fleteros: result});
                else
                    res.render('seguimiento_ori', {fleteros: result});
            }).catch(err => {
                if (name === 'TERRANORTE')
                res.render('seguimiento', {fleteros: []});
                else
                    res.render('seguimiento_ori', {fleteros: []});
            });

        },
        entregas: (req, res) => {
            const data = req.body;

            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            fletero.entregas(data.fecha).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};