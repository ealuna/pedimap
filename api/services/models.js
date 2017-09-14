const connections = require('./connection').getConnections();
const fs = require('fs');
const path = require('path');

function getModel(model) {
    let keys = Object.keys(connections);
    let models = {};

    for (let i = 0; i < keys.length; i++) {
        let name = keys[i];
        models[name] = connections[name].models[model];
    }

    return models;
}
let prueba = getModels('usuarios');
console.log(prueba);