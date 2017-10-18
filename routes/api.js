/**
 * Created by Edward Luna Noriega on 18/10/17.
 */

"use strict";

const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

const controllers = require('../api/controllers');
const SecretKey = require('../config/crypto.json').TERRANORTE.SECRET_KEY;
const settings = {'view options': {delimiter: '?'}};

app.use(helmet());
app.use(compression());

app.get('*', (req, res) => {
    res.status(400).json({msg: 'No hay respuestas para esta pagina.'});
});

app.post('/fleteros', (req, res) => {
    controllers.fleteros('TERRANORTE').find(req, res);
});

app.post('/clientes/today', (req, res) => {
    controllers.clientes('TERRANORTE').today(req, res);
});

app.post('/clientes/sinpedido', (req, res) => {
    controllers.clientes('TERRANORTE').sinpedido(req, res);
});

app.post('/clientes/despacho', (req, res) => {
    controllers.clientes('TERRANORTE').despacho(req, res);
});

app.post('/rutas/today', (req, res) => {
    controllers.rutas('TERRANORTE').today(req, res);
});

app.post('/rutas/reporte', (req, res) => {
    controllers.rutas('TERRANORTE').reporte(req, res);
});

app.post("/authenticate", function (req, res) {
    controllers.usuarios('TERRANORTE').AuthenticateApi(req, res);
});

app.post("/reporte/cobertura_p", function (req, res) {
    controllers.reporte('TERRANORTE').cobertura_p(req, res);
});

app.post("/reporte/cobertura_r", function (req, res) {
    controllers.reporte('TERRANORTE').cobertura_r(req, res);
});

app.post("/reporte/venta_neta", function (req, res) {
    controllers.reporte('TERRANORTE').ventas(req, res);
});

app.post("/reporte/empleados", function (req, res) {
    controllers.reporte('TERRANORTE').empleados(req, res);
});

app.post("/usuario/create", function (req, res) {
    controllers.usuarios('TERRANORTE').create(req, res);
});

app.post("/reporte/indicador1", function (req, res) {
    controllers.reporte('TERRANORTE').indicador1(req, res);
});

app.post("/reporte/indicador2", function (req, res) {
    controllers.reporte('TERRANORTE').indicador2(req, res);
});

app.post("/reporte/despacho", function (req, res) {
    controllers.clientes('TERRANORTE').reporteDespacho(req, res);
});

app.post("/reporte/entregas", function (req, res) {
    controllers.reporte('TERRANORTE').entregas(req, res);
});