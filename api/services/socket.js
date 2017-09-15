/**
 * Created by Edward Luna Noriega on 22/08/17.
 */
const socket = require('socket.io')();

socket.of('/oriunda').on('connection', (socket) => {
    socket.emit('flota', 'Hola');
});

module.exports = socket;