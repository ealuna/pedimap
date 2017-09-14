/**
 * Created by Edward Luna Noriega on 06/09/17.
 */
const express = require('express');
const router = express.Router();
const settings = {
    'view options': {
        delimiter: '?'
    }
};

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

module.exports = router;