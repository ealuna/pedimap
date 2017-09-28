/**
 * Created by Edward Luna Noriega on 22/09/17.
 */

"use strict";

const model = require('../models/fleteros');


module.exports = name => {
    return {
        find: (req, res) => {
            const data = req.body;
            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }
            const fletero = model(name);
            fletero.find(data.fletero, data.fecha).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        render: (req, res) => {
            const fletero = model(name);
            fletero.find(null, new Date()).then(result => {
                res.render('seguimiento', {fleteros: result});
            }).catch(err => {
                res.render('seguimiento', {fleteros: []});
            });
        }
    };
};