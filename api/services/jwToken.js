/**
 * Created by Edward Luna Noriega on 24/08/17.
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const LOCATION = path.join(__dirname, '..', '..', 'config', 'crypto.json');
const TOKEN_SECRET = JSON.parse(fs.readFileSync(LOCATION,'utf8')).TOKEN_SECRET;

module.exports = {
    generateToken: function (payload) {
        return jwt.sign(payload, TOKEN_SECRET, {});
    },
    verifyToken: function (token, callback) {
        return jwt.verify(token, TOKEN_SECRET, {}, callback);
    }
};