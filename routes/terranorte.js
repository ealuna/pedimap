/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

"use strict";

const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

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

const passoptions = {
    failureRedirect: '/terranorte/login'
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

app.post('/cliente/pedidos', (req, res) => {
    controllers.clientes('TERRANORTE').pedidos(req, res);
});

app.post('/cliente/documentos', (req, res) => {
    controllers.clientes('TERRANORTE').documentos(req, res);
});
app.post('/cliente/detalle_pedido', (req, res) => {
    controllers.clientes('TERRANORTE').pedidos_detalle(req, res);
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

app.post("/documentos/detalles", function (req, res) {
    controllers.documentos('TERRANORTE').detalles(req, res);
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

app.post("/despacho/fletero", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho(req, res);
});

app.post("/despacho/proveedor", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_proveedor(req, res);
});


app.post("/vendedor/despacho/generico", function (req, res) {
    controllers.vendedor('TERRANORTE').despacho_generico(req, res);
});

app.post("/vendedor/despacho/linea", function (req, res) {
    controllers.vendedor('TERRANORTE').despacho_linea(req, res);
});

app.post("/vendedor/despacho", function (req, res) {
    controllers.vendedor('TERRANORTE').despacho(req, res);
});

app.post("/ruta/despacho/generico", function (req, res) {
    controllers.rutas('TERRANORTE').despacho_generico(req, res);
});

app.post("/ruta/despacho/linea", function (req, res) {
    controllers.rutas('TERRANORTE').despacho_linea(req, res);
});

app.post("/ruta/despacho/proveedor", function (req, res) {
    controllers.rutas('TERRANORTE').despacho_proveedor(req, res);
});

app.post("/despacho/vendedor", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_vendedor(req, res);
});

app.post("/despacho/proveedor/general", function (req, res) {
    controllers.reporte('TERRANORTE').despacho_proveedor(req, res);
});

app.post("/despacho/ruta", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_ruta(req, res);
});

app.post("/despacho/consolidado", function (req, res) {
    controllers.fleteros('TERRANORTE').despacho_consolidado(req, res);
});

app.post("/despacho/consolidado/general", function (req, res) {
    controllers.reporte('TERRANORTE').consolidado_general(req, res);
});

router.use('/app', app);
router.use(compression());
router.use(helmet({noCache: true}));
router.use(bodyParser.urlencoded({extended: false}));

router.use(function (req, res, next) {
    if (req.cookies.SESSIONID && !req.headers.authorization) {
        req.headers.authorization = `JWT ${req.cookies.SESSIONID}`;
    }
    next();
});

router.post('/autenticar', function (req, res, next) {
    controllers.usuarios('TERRANORTE').AuthenticateWeb(req, res, next);
});

router.get('/seguimiento', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        controllers.fleteros('TERRANORTE').render(req, res, user);
    })(req, res, next);
});
/*
 router.get('/transporte', function (req, res) {
 res.render('fletero');
 });
 */


router.get('/reporte/cumplimiento', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('reporte1', {usuario: user});
    })(req, res, next);
});

router.get('/reporte/completos', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('reporte2', {usuario: user});
    })(req, res, next);
});



router.get('/inicio', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('informe', {usuario: user});
    })(req, res, next);
});

router.get('/informe/detallado', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('detallado', {usuario: user});
    })(req, res, next);
});

router.get("/logout", function (req, res) {
    res.cookie('SESSIONID', '', {expires: new Date(0)});
    res.redirect('/terranorte/login')
});

router.get('/login', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login');
        }
        console.log(user)
        switch(user.tipousua){
            case 1: res.redirect('/terranorte/inicio'); break;
            case 2: res.redirect('/terranorte/inicio'); break;
            case 4: res.redirect('/terranorte/inicio'); break;
            case 5: res.redirect('/terranorte/entregas'); break;
            case 6: res.redirect('/terranorte/clientes/pendientes'); break;
            default: res.redirect('/terranorte/login'); break;
        }
        //res.redirect('/terranorte/inicio')
    })(req, res, next);


    //if(!req.user) res.render('login');
});

router.get('/pedidos', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('pedido_v', {usuario: user});
    })(req, res, next);

});

router.get('/seguimiento/reporte', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('reporte', {usuario: user});
    })(req, res, next);
});

router.get('/transporte/pedidos', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('pedidos', {usuario: user});
    })(req, res, next);
});

router.get('/transporte/entregados', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('entregados', {usuario: user});
    })(req, res, next);
});

router.get('/transporte/fleteros', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 4) {
            return res.redirect('/terranorte/login');
        }
        res.render('fletero', {usuario: user});
    })(req, res, next);
});

router.get('/entregas', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 5) {
            return res.redirect('/terranorte/login');
        }
        res.render('entregar', {usuario: user});
    })(req, res, next);
});

router.get('/clientes/facturados', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 6) {
            return res.redirect('/terranorte/login');
        }
        res.render('cli_pedidos', {usuario: user});
    })(req, res, next);
});

router.get('/clientes/pendientes', function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || user.tipousua !== 6) {
            return res.redirect('/terranorte/login');
        }
        res.render('cli_pendientes', {usuario: user});
    })(req, res, next);
});

module.exports = router;