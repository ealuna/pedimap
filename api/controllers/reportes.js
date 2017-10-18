/**
 * Created by Edward Luna Noriega on 06/10/17.
 */

"use strict";

const model = require('../models/reportes');


module.exports = name => {

    const reportes = model(name);

    return {
        cobertura_p: (req, res) => {
            const data = req.body[0];
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.cobertura_p(data.fechainicial, data.fechafinal).then(result => {
                console.log(result)
                res.status(200).json(result);
            }).catch(err => {
               console.log(err)
                res.status(500).json({error: err});
            });
        },
        cobertura_r: (req, res) => {
            const data = req.body[0];
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.cobertura_r(data.fechainicial, data.fechafinal).then(result => {
                console.log(result)
                res.status(200).json(result);
            }).catch(err => {
               console.log(err)
                res.status(500).json({error: err});
            });
        },
        ventas: (req, res) => {
            const data = req.body[0];
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.ventas(data.fechainicial, data.fechafinal).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        empleados: (req, res) => {
            const data = req.body[0];
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.empleados(data.fechainicial, data.fechafinal).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        indicador1: (req, res) => {
            const data = req.body;
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.indicador1(data.fechainicial, data.fechafinal).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        indicador2: (req, res) => {
            const data = req.body;
            console.log(req.body)
            if (!data.fechainicial || !data.fechafinal) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            reportes.indicador2(data.fechainicial, data.fechafinal).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
    };
};
