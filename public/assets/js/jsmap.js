/**
 * Created by Edward Luna Noriega on 11/10/17.
 */

var polyline;
var customers = [];
var route_in_map = false;
var customers_in_map = false;
var socket = io.connect('/terranorte/reportes', {'forceNew': true});
var resultado = document.getElementById('reporte').getContext('2d');
var infowindow = new google.maps.InfoWindow({maxWidth: 350});
var legend = document.getElementById('legend');

map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);


socket.on('connect',
    function () {
        socket.emit('fleteros');
    }
);

socket.on('fleteros',
    function (data) {
        if (!data || !Array.isArray(data)) {
            return;
        }
        prepararDatos(data)
    }
);

function prepararDatos(data) {
    var select = '';
    for (var i = 0; i < data.length; i++) {
        select += crearOption(data[i]);
    }
    mostrarHTML('fleteros', select);
}

function crearOption(data) {
    return '<option value="' + data.id + '|' + data.device + '">' + data.id + ' (' + data.vehicle + ')' + '</option>';
}

function mostrarHTML(id, options) {
    document.getElementById(id).innerHTML = options;
}


function generarReporte() {
    var data = getValues();
    if (polyline) {
        polyline.setMap(null);
    }
    deleteCustomers();
    cargarRecorrido(
        {
            device: data.device,
            date_fr: data.date_fr,
            date_to: data.date_to
        }
    );
    cargarDespachos(data.date, data.fletero);

}

function timeformat(value) {
    return moment(value, ['h:mm A']).format('HH:mm');
}

function dateformat(value) {
    return moment(value, ['DD/MM/YYYY']).format('YYYY/MM/DD');
}

function cargarDespachos(fecha, fletero) {
    $.ajax({
        type: 'POST',
        url: '/terranorte/app/reporte/despacho',
        contentType: "application/json",
        data: JSON.stringify({fecha: fecha, fletero: fletero}),
        success: function (result) {
            createMarkers(result);
            CrearGrafico(result);
        }
    });
}

function cargarRecorrido(data) {
    socket.emit('reporte', data);
}

function createMarkers(data) {
    if (!data.length) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        createCustomerMarker(data[i]);
    }
}

function createCustomerMarker(value) {
    var data = setCustomerIcon(value);
    var marker = new google.maps.Marker(data);
    customers.push(marker);
    showCustomerMarker(marker);
}

function showCustomerMarker(marker) {
    if (customers_in_map) {
        marker.setMap(map);
    }
}

function deleteCustomers() {
    if (customers_in_map) {
        clearCustomersInMap();
    }
    customers = [];
}


function setCustomerIcon(value) {
    value.icon = value.resultado === 1 ? '/assets/img/marker2.png' : '/assets/img/no_sales_marker.png';
    return value;
}


function showCustomersInMap() {
    if (customers.length) {
        for (var i = 0; i < customers.length; i++) {
            customers[i].setMap(map);
        }
    }
}

function clearCustomersInMap() {
    if (customers.length) {
        for (var i = 0; i < customers.length; i++) {
            customers[i].setMap(null);
        }
    }
}

function clearCustomers() {
    customers_in_map = false;
    clearCustomersInMap();
}


function showCustomers() {
    customers_in_map = true;
    showCustomersInMap();
}


function customersInMap() {
    if (customers_in_map) {
        return clearCustomers();
    }
    showCustomers();
}

function getValues() {
    var date = document.getElementById('datepicker').value;
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var fletero = document.getElementById('fleteros').value.split('|');

    return {
        date_fr: dateformat(date) + '/' + timeformat(startTime),
        date_to: dateformat(date) + '/' + timeformat(endTime),
        fletero: fletero[0],
        device: fletero[1],
        date: dateformat(date)
    };
}

socket.on('reporte', function (data) {
    //console.log(data)
    CreatePolyline(data);
});

function CreatePolyline(data) {

    //var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#F00', fillColor: '#F00', fillOpacity: 1};
    //var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#000000', fillColor: '#000000', fillOpacity: 1};
    var points = data[0].points;
    var path = [];

    for (var i = 0; i < points.length; i++) {
        var a = [points[i].position, points[i + 1].position];
        //var point = points[i];
        //point.icon = symbol;
        //var marker = new google.maps.Marker(point);
        var line = new google.maps.Polyline({
            path: a, strokeWeight: 1.25, strokeColor: '#4169E1', icons: [{
                icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
                offset: '100%'
            }]
        });
        path.push(line);
        //FOCUS_POLYLINE_POINTS.push(marker);

        //marker.setMap(MAP);
        line.setMap(map);
    }

    //var line = new google.maps.Polyline({path: path, strokeWeight: 1.25, strokeColor: '#4169E1'});

    //polyline = line;

    //line.setMap(map);
}

function CrearGrafico(values) {

    var rechazo = 0;
    var atendidos = 0;

    for (var i = 0; i < values.length; i++) {
        if (values[i].resultado === 1) {
            atendidos++;
            continue;
        }
        rechazo++;
    }

    var data = {
        datasets: [{
            data: [rechazo, atendidos],
            backgroundColor: [
                'rgb(209, 41, 44)',
                'rgb(16, 209, 69)'
            ]
        }],
        labels: [
            'Rechazo',
            'Atendidos'
        ]
    };

    var myDoughnutChart = new Chart(resultado, {
        type: 'pie',
        data: data,
        options: {
            legend: {position: 'bottom'},
            responsive: true,
            maintainAspectRatio: false,
            pieceLabel: {
                render: 'percentage',
                fontColor: ['white', 'white'],
                precision: 2
            }
        }
    });

}