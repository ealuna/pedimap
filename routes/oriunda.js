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
    controllers.usuarios('ORIUNDA').findAll({where: {usuario: payload.usuario}}).then(usuario => {
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
    controllers.fleteros('ORIUNDA').find(req, res);
});

app.post('/clientes/today', (req, res) => {
    controllers.clientes('ORIUNDA').today(req, res);
});

app.post('/clientes/sinpedido', (req, res) => {
    controllers.clientes('ORIUNDA').sinpedido(req, res);
});

app.post('/clientes/despacho', (req, res) => {
    controllers.clientes('ORIUNDA').despacho(req, res);
});

app.post('/rutas/today', (req, res) => {
    controllers.rutas('ORIUNDA').today(req, res);
});

app.post('/rutas/reporte', (req, res) => {
    controllers.rutas('ORIUNDA').reporte(req, res);
});

app.post("/authenticate", function (req, res) {
    controllers.usuarios('ORIUNDA').AuthenticateApi(req, res);
});

app.post("/reporte/cobertura_p", function (req, res) {
    controllers.reporte('ORIUNDA').cobertura_p(req, res);
});

app.post("/reporte/cobertura_r", function (req, res) {
    controllers.reporte('ORIUNDA').cobertura_r(req, res);
});

app.post("/reporte/venta_neta", function (req, res) {
    controllers.reporte('ORIUNDA').ventas(req, res);
});

app.post("/reporte/empleados", function (req, res) {
    controllers.reporte('ORIUNDA').empleados(req, res);
});

app.post("/usuario/create", function (req, res) {
    controllers.usuarios('ORIUNDA').create(req, res);
});

app.post("/reporte/indicador1", function (req, res) {
    controllers.reporte('ORIUNDA').indicador1(req, res);
});

app.post("/reporte/indicador2", function (req, res) {
    controllers.reporte('ORIUNDA').indicador2(req, res);
});

app.post("/reporte/despacho", function (req, res) {
    controllers.clientes('ORIUNDA').reporteDespacho(req, res);
});

app.post("/reporte/entregas", function (req, res) {
    controllers.reporte('ORIUNDA').entregas(req, res);
});


app.post("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({message: "Success! You can not see this without a token"});
});

router.use('/app', app);
router.use(compression());
router.use(helmet({noCache: true}));

router.get('/seguimiento', function (req, res) {
    controllers.fleteros('ORIUNDA').render(req, res);
});

router.get('/transporte', function (req, res) {
    res.render('fletero');
});


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
    res.render('flota_ori', {settings: settings});
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/pedidos', function (req, res, next) {
    res.render('pedido_v');
});

router.get('/seguimiento/reporte', function (req, res, next) {
    res.render('reporte_ori');
});

module.exports = router;