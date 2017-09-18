/**
 * Created by Edward Luna Noriega on 22/08/17.
 */
const socket = require('socket.io')();
const controllers = require('../controllers');


function setIntervalandExecute(fn, time) {
    fn();
    return setInterval(fn, time);
}

socket.of('/oriunda').on('connection', (socket) => {
    const repeat = setIntervalandExecute(function () {
        controllers.flota('ORIUNDA').list('all').then(data => {
            socket.emit('flota', data);
        });
    }, 9000);
    socket.on('disconnect', function () {
        clearInterval(repeat);
    });
});

socket.of('/terranorte').on('connection', (socket) => {
    const repeat = setIntervalandExecute(function () {
        controllers.flota('TERRANORTE').list('all').then(data => {
            socket.emit('flota', data);
        });
    }, 9000);
    socket.on('disconnect', function () {
        clearInterval(repeat);
    });
});

module.exports = socket;