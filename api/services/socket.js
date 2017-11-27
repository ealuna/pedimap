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

    /*socket.on('entrega',
     function (resultado) {
     socket.emit('resultado', resultado);
     }
     );*/

    socket.on('fleteros',
        () => {
            if (fleets.ORIUNDA.length) {
                socket.emit('fleteros', fleets.ORIUNDA);
            }
        }
    );

    socket.on('resultado',
        data => {
            controllers.clientes('ORIUNDA').entrega(data,
                (err, result) => {
                    if (!err) socket.broadcast.emit('entregado', data);
                }
            );
        }
    );

    socket.on('vehiculo',
        data => {
            controllers.vehiculo('ORIUNDA').points(data,
                (err, result) => {
                    if (!err) socket.emit('device', result);
                }
            );
        }
    );


});

io.of('/terranorte').on('connection', (socket) => {

    socket.emit('flota', fleets.TERRANORTE);

    /*socket.on('entrega',
     function (resultado) {
     socket.emit('resultado', resultado);
     }
     );*/

    socket.on('fleteros',
        () => {
            if (fleets.TERRANORTE.length) {
                socket.emit('fleteros', fleets.TERRANORTE);
            }
        }
    );

    socket.on('resultado',
        data => {
        console.log(data);
            controllers.clientes('TERRANORTE').entrega(data,
                (err, result) => {
                    if (!err) socket.broadcast.emit('entregado', data);
                }
            );
        }
    );

    socket.on('vehiculo',
        data => {
            controllers.vehiculo('TERRANORTE').points(data,
                (err, result) => {
                    if (!err) socket.emit('device', result);
                }
            );
        }
    );

});

io.of('/terranorte/reportes').on('connection', function (socket) {
    socket.on('fleteros',
        () => {
            if (fleets.TERRANORTE.length) socket.emit('fleteros', fleets.TERRANORTE);

        }
    );
    socket.on('reporte',
        data => {
            controllers.vehiculo('TERRANORTE').reporte(data,
                (err, result) => {
                    if (!err) socket.emit('reporte', result);
                }
            );
        }
    );
});


io.of('/oriunda/reportes').on('connection', function (socket) {
    socket.on('fleteros',
        () => {
            if (fleets.ORIUNDA.length) socket.emit('fleteros', fleets.ORIUNDA);

        }
    );
    socket.on('reporte',
        data => {
            controllers.vehiculo('ORIUNDA').reporte(data,
                (err, result) => {
                    if (!err) socket.emit('reporte', result);
                }
            );
        }
    );
});


module.exports = io;