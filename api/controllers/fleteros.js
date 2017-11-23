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
        render: (req, res, user) => {

            fletero.find(null, new Date()).then(result => {
                if (name === 'TERRANORTE')
                    res.render('seguimiento', {fleteros: result, usuario: user});
                else
                    res.render('seguimiento_ori', {fleteros: result, usuario: user});
            }).catch(err => {
                if (name === 'TERRANORTE')
                    res.render('seguimiento', {fleteros: [], usuario: user});
                else
                    res.render('seguimiento_ori', {fleteros: [], usuario: user});
            });

        },
        entregas: (req, res) => {
            const data = req.body;

            if (!data.fecha) {
                return res.status(400).json({msg: 'El campo fecha es requerido'})
            }

            fletero.entregas(data.fecha, data.fletero).then(result => {
                res.status(200).json(result);
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        carga: (req, res) => {
            const data = req.body;

            if (!data.fletero) {
                return res.status(400).json({msg: 'El campo fletero es requerido'})
            }

            fletero.carga(data.fecha, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        documentos: (req, res) => {
            const data = req.body;

            if (!data.fletero) {
                return res.status(400).json({msg: 'El campo fletero es requerido'})
            }

            fletero.documentos(data.fecha, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        detalles: (req, res) => {
            const data = req.body;

            if (!data.fletero) {
                return res.status(400).json({msg: 'El campo fletero es requerido'})
            }

            fletero.detalles(data.fecha, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        reporte: (req, res) => {
            const data = req.body;

            if (!data.fletero || !data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'El campo fletero es requerido'})
            }

            fletero.reporte(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_generico: (req, res) => {
            const data = req.body;

            if (!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_generico(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_linea: (req, res) => {
            const data = req.body;

            if (!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_linea(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_proveedor: (req, res) => {
            const data = req.body;

            if (!data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_proveedor(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_vendedor: (req, res) => {
            const data = req.body;

            if (!data.fletero || !data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_vendedor(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_ruta: (req, res) => {
            const data = req.body;

            if (!data.fletero || !data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_ruta(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        },
        despacho_consolidado: (req, res) => {
            const data = req.body;

            if (!data.fletero || !data.fecha_inicial || !data.fecha_final) {
                return res.status(400).json({msg: 'Los campo fletero y fecha son requeridos'})
            }

            fletero.despacho_consolidado(data.fecha_inicial, data.fecha_final, data.fletero).then(result => {
                res.status(200).json({data: result});
            }).catch(err => {
                res.status(500).json({error: err});
            });
        }
    };
};