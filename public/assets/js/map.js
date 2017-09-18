/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var map;
var socket = io.connect('/oriunda', {'forceNew': true});
var vehiculos = {};

$(function () {
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: {"lat": -11.924000, "lng": -77.071365},
        zoom: 11,
        styles: [{
            featureType: "poi", stylers: [{visibility: "off"}]
        }, {
            featureType: "transit.station", stylers: [{visibility: "off"}]
        }]
    });
});

socket.on('flota', function (data) {
    iterator(data);
});


function iterator(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        viewInMap(data[i]);
    }
    console.log(vehiculos)
}

function viewInMap(data) {
    var vehiculo = new google.maps.Marker(data);
    vehiculos[data.id] = vehiculo;
    vehiculo.setMap(map);
}

