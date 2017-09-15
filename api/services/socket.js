/**
 * Created by Edward Luna Noriega on 22/08/17.
 */
const socket = require('socket.io')();

//const namespaces = [socket.of('/oriunda'), socket.of('/terranorte')];

socket.of('/oriunda').on('connection', (socket) => {
    /*const a = setInterval(

    );*/
    socket.emit('prueba', 'HOLA');
    socket.on('disconnect', () => {
        console.log('Someone disconnected from namespace bucket 1005.');
    });
});

socket.of('/terranorte').on('connection', (socket) => {
    socket.emit('prueba', 'HOLA');
    socket.on('disconnect', () => {
        console.log('Someone disconnected from namespace bucket 1005.');
    });
});

module.exports = socket;