/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

const express = require('express');
const api = express.Router();
const router = express.Router();
const compression = require('compression');
const helmet = require('helmet');
const controllers = require('../api/controllers');
const settings = {'view options': {delimiter: '?'}};

//const connection = require('../api/services/connection').TERRANORTE;
//const models = require('../api/models')(connection);
//const controllers = require('../api/controllers');

api.use(helmet());
api.use(compression());

api.get('*', (req, res) => {
    res.status(400).json({msg: 'No hay respuestas para esta pagina.'});
});

api.post('/fletero', (req, res) => {
    controllers.fleteros('ORIUNDA').find(req, res);
});


router.use('/app', api);
router.use(compression());
router.use(helmet({cache: true}));

module.exports = router;