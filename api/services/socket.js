/**
 * Created by Edward Luna Noriega on 22/08/17.
 */

"use strict";

const socket = require('socket.io')();
const controllers = require('../controllers');
const fleets = {
    ORIUNDA: [],
    TERRANORTE: []
};

function setIntervalandExecute(fn, time) {
    fn();
    return setInterval(fn, time);
}

setIntervalandExecute(() => {
    controllers.flota('ORIUNDA').group('all', (err, data) => {
        if (!err && data.length) {
            fleets.ORIUNDA = data;
            socket.of('/oriunda').emit('flota', data);
        }
    });
    controllers.flota('TERRANORTE').group('all', (err, data) => {
        if (!err && data.length) {
            fleets.TERRANORTE = data;
            socket.of('/terranorte').emit('flota', data);
        }
    });
}, 10000);


socket.of('/oriunda').on('connection', (socket) => {
    socket.emit('flota', fleets.ORIUNDA);

    socket.on('entrega', function (resultado) {
        socket.emit('resultado', resultado);
    });

    socket.on('vehiculo', function (device) {
        controllers.vehiculo('ORIUNDA').points(device, (err, data) => {
            if (!err && data.length) {
                socket.emit('device', data);
            }
        });
    });

});

socket.of('/terranorte').on('connection', (socket) => {
    socket.emit('flota', fleets.TERRANORTE);
    
    socket.on('entrega', function (resultado) {
        socket.emit('resultado', resultado);
    });

    socket.on('vehiculo', function (device) {
        //console.log(device)
        controllers.vehiculo('TERRANORTE').points(device, (err, data) => {
            if (!err && data.length) {
                socket.emit('device', data);
            }
        });
    });

});

module.exports = socket;