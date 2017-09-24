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
    controllers.flota('ORIUNDA').list('all').then(data => {
        if(data.length) fleets.ORIUNDA = data;
    });
    controllers.flota('TERRANORTE').list('all').then(data => {
        if(data.length) fleets.TERRANORTE = data;
    });
}, 10000);


socket.of('/oriunda').on('connection', (socket) => {
    const repeat = setIntervalandExecute(function () {
        //console.log(socket.handshake);
        socket.emit('flota', fleets.ORIUNDA);
    }, 9000);
    socket.on('disconnect', function () {
        clearInterval(repeat);
    });
});

socket.of('/terranorte').on('connection', (socket) => {
    const repeat = setIntervalandExecute(function () {
       // console.log(socket.handshake);
        socket.emit('flota', fleets.TERRANORTE);
    }, 9000);
    socket.on('disconnect', function () {
        clearInterval(repeat);
    });
});

module.exports = socket;