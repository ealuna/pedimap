/**
 * Created by Edward Luna Noriega on 22/08/17.
 */
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
    //const repeat = setIntervalandExecute(function () {
    socket.emit('flota', fleets.ORIUNDA);
    //}, 9000);
    socket.on('device', function (device) {
        clearInterval(repeat);
    });
});

socket.of('/terranorte').on('connection', (socket) => {
    //const repeat = setIntervalandExecute(function () {
    // console.log(socket.handshake);
    socket.emit('flota', fleets.TERRANORTE);
    //}, 9000);
    /*socket.on('disconnect', function () {
     clearInterval(repeat);
     });*/
});

module.exports = socket;