/**
 * Created by Edward Luna Noriega on 23/08/17.
 */
/*const as = require('../controllers/usuario').prueba.terranorte;
 setInterval(function(){
 let a1s =    new require('../controllers/usuario');
 console.log('prueba');
 }, 200);
 */
/*
var fs = require('fs');
var path = require('path');

var files = fs.readdirSync('../models').map(function (file) {
    console.log(path.join(__dirname, '..', 'models', file));
}).filter(function (file) {
    return file !== __filename;
});*/


var connextion = require('./connection').getConnections();

console.log(connextion.oriunda.models);
connextion.terranorte.models.usuarios.create({
   // nrousua: 3,
    usuario: 'HOLA',
    clave: 'dafdaskl',
    sha1: 'adasd',
    activo: 1,
    idSucur: 1,
    descrip: 'PRUEBA',
    coduser: 0,
    codtipusua: 1
});

/*
var models = {};

files.forEach(function (file) {
    var model = db.import(file);
    models[model.name] = model;
});

Object.keys(models).forEach(function (name) {
    if ('associate' in models[name]) {
        models[name].associate(db);
    }
});
*/