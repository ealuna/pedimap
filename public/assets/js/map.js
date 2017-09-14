/**
 * Created by Edward Luna Noriega on 14/09/17.
 */
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: {
            "lat": -11.924000,
            "lng": -77.071365
        },
        zoom: 11,
        styles: [
            {
                featureType: "poi",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                featureType: "transit.station",
                stylers: [
                    {visibility: "off"}
                ]
            }
        ]
    });
}


function viewInMap(data) {
//    map.
}

