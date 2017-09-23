/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var SOCKET = io.connect('/terranorte', {'forceNew': true});
var HOVER_OFF_SET = 80000;
var ICON_CONFIG = {url: '/assets/img/marker-truck.png', labelOrigin: new google.maps.Point(25, 10)};
var VEHICLES = {};
var TRUCKS = {};

SOCKET.on('flota', function (data) {
    iterator(data);
});

function iterator(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].zIndex = HOVER_OFF_SET + i;
        viewMarkerInMap(data[i], i);
    }
    console.log(VEHICLES)
}

function viewMarkerInMap(data) {
    data.icon = ICON_CONFIG;
    data.label = {text: data.id.toString(), fontSize: '11px'};
    var vehiculo = new google.maps.Marker(data);
    if(VEHICLES.hasOwnProperty(data.id)){
        VEHICLES[data.id].setMap(null);
    }
    VEHICLES[data.id] = vehiculo;
    vehiculo.setMap(MAP);
}











