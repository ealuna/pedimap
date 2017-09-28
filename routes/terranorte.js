/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

/**
 * Created by Edward Luna Noriega on 28/09/17.
 */

const express = require('express');
const app = express.Router();
const router = express.Router();
const compression = require('compression');
const helmet = require('helmet');
const controllers = require('../api/controllers');
const settings = {'view options': {delimiter: '?'}};

//const connection = require('../api/services/connection').TERRANORTE;
//const models = require('../api/models')(connection);
//const controllers = require('../api/controllers');

app.use(helmet());
app.use(compression());

app.get('*', (req, res) => {
    res.status(400).json({msg: 'No hay respuestas para esta pagina.'});
});

app.post('/fleteros', (req, res) => {
    controllers.fleteros('TERRANORTE').find(req, res);
});

router.use('/app', app);
router.use(compression());
router.use(helmet({cache: true}));

router.get('/seguimiento', function (req, res) {
    controllers.fleteros('TERRANORTE').render(req, res);
});

module.exports = router;