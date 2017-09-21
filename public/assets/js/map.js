/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

//var map;
var socket = io.connect('/oriunda', {'forceNew': true});
//var LABEL_MARKER = new google.maps.MarkerLabel({fontSize: 11});
//var MARKER_TRUCK = new google.maps.Icon({labelOrigin: '', url: '/assets/img/marker-truck.png'});
var HOVER_OFF_SET = 80000;
var ICON_CONFIG = {url: '/assets/img/marker-truck.png', labelOrigin: new google.maps.Point(25, 10)};
var vehiculos = {};

/*$(function () {
 map = new google.maps.Map(document.getElementById('mapa'), {
 center: {"lat": -11.924000, "lng": -77.071365},
 zoom: 11,
 styles: [{
 featureType: "poi", stylers: [{visibility: "off"}]
 }, {
 featureType: "transit.station", stylers: [{visibility: "off"}]
 }]
 });
 });*/

socket.on('flota', function (data) {
    iterator(data);
});


function iterator(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].zIndex = HOVER_OFF_SET + i;
        viewInMap(data[i], i);
    }
    console.log(vehiculos)
}

function viewInMap(data) {
    data.icon = ICON_CONFIG;
    data.label = {text: data.id.toString(), fontSize: '11px'};
    var vehiculo = new google.maps.Marker(data);
    vehiculos[data.id] = vehiculo;
    vehiculo.setMap(map);
}

