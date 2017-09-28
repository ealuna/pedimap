/**
 * Created by Edward Luna Noriega on 06/09/17.
 */
const express = require('express');
const router = express.Router();
const compression = require('compression');

const connection = require('../api/services/connection').TERRANORTE;
//const models = require('../api/models')(connection);
const controllers = require('../api/controllers');

const helmet = require('helmet');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'EvilSecret'
};

const settings = {
    'view options': {
        delimiter: '?'
    }
};

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    models.usuarios.findAll({where: {nrousua: jwt_payload.id}}).then(usuario => {
        if (usuario[0]) {
            return next(null, usuario[0].toJSON());
        } else {
            return next(null, false);
        }
    }).catch(err => {
        console.log(err)
    });
}));

router.use(compression());
router.use(passport.initialize());
router.use(helmet({noCache: true}));

router.use(function (req, res, next) {
    if (req.cookies.SESSIONID && !req.headers.authorization) {
        req.headers.authorization = `JWT ${req.cookies.SESSIONID}`;
    }
    next();
});

/* GET users listing. */
router.get('/login', function (req, res, next) {

    res.render('login');
});

router.get('/seguimiento', function (req, res, next) {
    res.render('seguimiento', {fleteros: []});
});

router.get('/inicio', function (req, res, next) {
    res.render('flota', {settings: settings});
});

router.post("/login", function (req, res) {
    controllers.usuarios(models).authenticate(req, res);
});

router.post("/usuario/create", function (req, res) {
    //console.log(req.body);
    controllers.usuarios(models).massive(req, res);
});

router.get("/logout", function (req, res) {
    res.cookie('SESSIONID', '', {expires: new Date(0)});
    res.json({message: 'Logout Success!!!!'});
});

router.get("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({message: "Success! You can not see this without a token"});
});

/*router.get("/clientes", (req, res) => {
    connection.query("EXEC [SP].[cliente]").spread(result => {
       // res.send(result);
        const a = JSON.stringify(result)
        res.set('Content-Type', 'application/json');
        res.send(a);
    });
});*/

module.exports = router;