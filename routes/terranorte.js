/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

"use strict";

const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

const controllers = require('../api/controllers');
const SecretKey = require('../config/crypto.json').HOME.SECRET_KEY;
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
    controllers.usuarios('HOME').findAll({where: {usuario: payload.usuario}}).then(usuario => {
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
    controllers.fleteros('HOME').find(req, res);
});

app.post('/clientes/today', (req, res) => {
    controllers.clientes('HOME').today(req, res);
});

app.post('/clientes/sinpedido', (req, res) => {
    controllers.clientes('HOME').sinpedido(req, res);
});

app.post('/rutas/today', (req, res) => {
    controllers.rutas('HOME').today(req, res);
});

app.post("/authenticate", function (req, res) {
    controllers.usuarios('HOME').AuthenticateApi(req, res);
});

app.post("/usuario/create", function (req, res) {
    controllers.usuarios('HOME').create(req, res);
});

app.post("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({message: "Success! You can not see this without a token"});
});

router.use('/app', app);
router.use(compression());
router.use(helmet({noCache: true}));

router.get('/seguimiento', function (req, res) {
    controllers.fleteros('HOME').render(req, res);
});

router.get('/transporte', function (req, res) {
    res.render('fletero');
});

router.get('/inicio', function (req, res) {
    res.render('flota', {settings: settings});
});

module.exports = router;