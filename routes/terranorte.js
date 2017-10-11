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

app.post("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({message: "Success! You can not see this without a token"});
});

router.use('/app', app);
router.use(compression());
router.use(helmet({noCache: true}));

router.get('/seguimiento', function (req, res) {
    controllers.fleteros('TERRANORTE').render(req, res);
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
    res.render('flota', {settings: settings});
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/pedidos', function (req, res, next) {
    res.render('pedido_v');
});

module.exports = router;