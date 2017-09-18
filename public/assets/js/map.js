/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var socket = io.connect('/oriunda', {'forceNew': true});
var vehiculos = {};

socket.on('flota', function (data) {
    iterator(data);
});


function iterator(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        viewInMap(data[i]);
    }
}

function viewInMap(data) {
    var vehiculo = new google.maps.Marker(data);
    vehiculo[data.id] = vehiculo;
    vehiculo.setMap(map);
}

