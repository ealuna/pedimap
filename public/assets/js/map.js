/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var socket = io.connect('/oriunda', {forceNew: true});

socket.on('prueba', function (value) {
    console.log(value);
});
