/**
 * Created by Edward Luna Noriega on 22/08/17.
 */

"use strict";

const io = require('socket.io')();
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
            io.of('/oriunda').emit('flota', data);
        }
    });
    controllers.flota('TERRANORTE').group('all', (err, data) => {
        if (!err && data.length) {
            fleets.TERRANORTE = data;
            io.of('/terranorte').emit('flota', data);
        }
    });
}, 10000);


io.of('/oriunda').on('connection', (socket) => {
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

io.of('/terranorte').on('connection', (socket) => {
    socket.emit('flota', fleets.TERRANORTE);
    
    socket.on('entrega', function (resultado) {
        socket.emit('resultado', resultado);
    });

    socket.on('Prueba', function (resultado) {
        console.log(resultado)
        socket.broadcast.emit('recibido', resultado);
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

module.exports = io;