/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

"use strict";

const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

const controllers = require('../api/controllers');
const SecretKey = require('../config/crypto.json').TERRANORTE.SECRET_KEY;
const settings = {'view options': {delimiter: '?'}};

const app = express.Router();
const router = express.Router();


const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: SecretKey
};

passport.use(new JwtStrategy(JwtOptions, (payload, next) => {
    controllers.usuarios('TERRANORTE').findAll({where: {usuario: payload.usuario}}).then(usuario => {
        if (usuario[0]) {
            return next(null, usuario[0].toJSON());
        } else {
            return next(null, false);
        }
    }).catch(err => {
        console.log(err)
    });
}));

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

app.post("/pedidos/facturado", function (req, res) {
    controllers.documentos('TERRANORTE').pedidos(req, res);
});

app.post("/fleteros/entregas", function (req, res) {
    controllers.fleteros('TERRANORTE').entregas(req, res);
});

app.post("/fleteros/carga", function (req, res) {
    controllers.fleteros('TERRANORTE').carga(req, res);
});

app.post("/fleteros/detalles", function (req, res) {
    controllers.fleteros('TERRANORTE').detalles(req, res);
});

app.post("/fleteros/documentos", function (req, res) {
    controllers.fleteros('TERRANORTE').documentos(req, res);
});

app.post("/documentos/entregas", function (req, res) {
    controllers.documentos('TERRANORTE').entregas(req, res);
});

app.post("/documentos/entregas_horas", function (req, res) {
    controllers.documentos('TERRANORTE').entregas_horas(req, res);
});

app.post("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    console.log(req.user)
    res.json({message: "Success! You can not see this without a token"});
});

app.post("/fleteros/reporte", function (req, res) {
    controllers.fleteros('TERRANORTE').reporte(req, res);
});

app.post("/despacho/generico", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_generico(req, res);
});

app.post("/despacho/linea", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_linea(req, res);
});

app.post("/despacho/proveedor", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_proveedor(req, res);
});

app.post("/despacho/vendedor", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_vendedor(req, res);
});

app.post("/despacho/ruta", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_ruta(req, res);
});

app.post("/despacho/consolidado", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_consolidado(req, res);
});

router.use('/app', app);
router.use(compression());
router.use(helmet({noCache: true}));

router.get('/seguimiento', function (req, res) {
    controllers.fleteros('TERRANORTE').render(req, res);
});
/*
router.get('/transporte', function (req, res) {
    res.render('fletero');
});
*/
router.get('/entregas', function (req, res) {
    res.render('entregar');
});

router.get('/reporte/cumplimiento', function (req, res) {
    res.render('reporte1');
});

router.get('/reporte/completos', function (req, res) {
    res.render('reporte2');
});

router.get('/entregas', function (req, res) {
    res.render('entregar');
});

router.get('/inicio', function (req, res) {
    res.render('informe');
});

router.get('/informe/detallado', function (req, res) {
    res.render('detallado');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/pedidos', function (req, res, next) {
    res.render('pedido_v');
});

router.get('/seguimiento/reporte', function (req, res, next) {
    res.render('reporte');
});

router.get('/transporte/pedidos', function (req, res, next) {
    res.render('pedidos');
});

router.get('/transporte/entregados', function (req, res, next) {
    res.render('entregados');
});

router.get('/transporte/fleteros', function (req, res, next) {
    res.render('fletero');
});

module.exports = router;