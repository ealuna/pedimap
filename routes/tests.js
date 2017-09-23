/**
 * Created by Edward Luna Noriega on 06/09/17.
 */
const express = require('express');
const router = express.Router();

const connection = require('../api/services/connection').ORIUNDA;
const models = require('../api/models')(connection);
const controllers = require('../api/controllers');

const helmet = require('helmet');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'EvilSecret'
};

const settings = {
    'view options': {
        delimiter: '?'
    }
};

const p = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('HOLAA____________________________________________')
    models.usuario.findAll({where: {nrousua: jwt_payload.id}}).then(usuario => {
        if(usuario[0]){
            return next(null, usuario[0].toJSON());
        } else {
            return next(null, false);
        }
    }).catch(err => {
        console.log(err)
    });
});


passport.use(p);

router.use(passport.initialize());
router.use(helmet({noCache: true}));

/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/seguimiento', function (req, res, next) {
    res.render('seguimiento');
});

router.get('/inicio', function (req, res, next) {
    res.render('flota', {settings: settings});
});


router.post("/login", function (req, res) {
    controllers.usuarios(models).authenticate(req, res);
});

router.post("/usuario/create", function (req, res) {
    console.log(req.body);
    controllers.usuarios(models).create(req, res);
});


router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});


module.exports = router;