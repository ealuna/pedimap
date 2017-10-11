/**
 * Created by Edward Luna Noriega on 11/10/17.
 */


var socket = io.connect('/terranorte', {'forceNew': true});
var infowindow = new google.maps.InfoWindow({maxWidth: 350});





socket.on('reporte', function (data) {

});