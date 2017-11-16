/**
 * Created by Edward Luna Noriega on 11/10/17.
 */




var reporte;

var routes = [];
var customers = [];
var polylines = [];

var route_in_map = false;
var customers_in_map = false;

var _fletero = 0;
var _fecha = '';
var _startTime = '';
var _endTime = '';

//var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow({maxWidth: 350});
var socket = io.connect('/terranorte/reportes', {'forceNew': true});

var legend = document.getElementById('legend');
var options = document.getElementById('options');
var resultado = document.getElementById('reporte').getContext('2d');


map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
map.controls[google.maps.ControlPosition.LEFT_TOP].push(options);


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

    resetMap();
    cargarRecorrido(
        {
            device: data.device,
            date_fr: data.date_fr,
            date_to: data.date_to
        }
    );
    cargarDespachos(data.date, data.fletero);
    cargarRutas(data.date, data.fletero);
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
        data: JSON.stringify({fechainicial: fecha, fechafinal: fecha, fletero: fletero}),
        success: function (result) {
            createMarkers(result);
            crearGrafico(result);
        }
    });
}

function cargarRutas(fecha, fletero) {
    $.ajax({
        type: 'POST',
        url: '/terranorte/app/rutas/reporte',
        contentType: "application/json",
        data: JSON.stringify({fecha: fecha, fletero: fletero}),
        success: function (result) {
            createPolygons(result);
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

function createPolygons(data) {
    if (!data.length) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        createRoutePolygon(data[i]);
    }
}

function createRoutePolygon(value) {
    var points = [];
    var coords = value.coords.match(/\([^\(\)]+\)/g);
    if (coords !== null) {
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i].match(/-?\d+\.?\d*/g);
            if (coord !== null) {
                for (var j = 0; j < coord.length; j += 2) {
                    var point = {lng: Number(coord[j]), lat: Number(coord[j + 1])};
                    points.push(point);
                }
            }
        }
    }
    var polygon = new google.maps.Polygon(
        {
            ruta: value.ruta,
            vendedor: value.vendedor,
            supervisor: value.supervisor,
            center: value.position,
            paths: points,
            strokeColor: '#7c7e82',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0
        }
    );
    routes.push(polygon);
    showRoutePolygon(polygon);
}

function showRoutePolygon(polygon) {
    if (route_in_map) {
        polygon.setMap(map);
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

function deleteRoutes() {
    if (route_in_map) {
        clearRoutesInMap();
    }
    routes = [];
}


function deletePolylines() {
    if (polylines.length) {
        clearPolylines();
    }
    polylines = [];
}

function resetMap() {
    deleteCustomers();
    deleteRoutes();
    deletePolylines();
}

function clearMap() {
    clearRoutes();
    clearCustomers();
    clearPolylines();
}

function setCustomerIcon(value) {
    value.icon = (value.rechazo > 0 && value.liquidado === 0) ? '/assets/img/no_sales_marker.png' : '/assets/img/marker3.png';
    return value;
}


function showCustomersInMap() {
    if (customers.length) {
        for (var i = 0; i < customers.length; i++) {
            customers[i].setMap(map);
        }
    }
}

function showRoutesInMap() {
    if (routes.length) {
        for (var i = 0; i < routes.length; i++) {
            routes[i].setMap(map);
        }
    }
}

function clearRoutesInMap() {
    if (routes.length) {
        for (var i = 0; i < routes.length; i++) {
            routes[i].setMap(null);
        }
    }
}

function clearPolylines() {
    if (polylines.length) {
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
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

function clearRoutes() {
    route_in_map = false;
    clearRoutesInMap();
}

function showRoutes() {
    route_in_map = true;
    showRoutesInMap();
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
    centerMap();
}

function routesInMap() {
    if (route_in_map) {
        return clearRoutes();
    }
    showRoutes();
}

function getValues() {
    var date = document.getElementById('datepicker').value;
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var fletero = document.getElementById('fleteros').value.split('|');

    _fletero = fletero[0];
    _fecha = date;
    _startTime = startTime;
    _endTime = endTime;

    return {
        date_fr: dateformat(date) + '/' + timeformat(startTime),
        date_to: dateformat(date) + '/' + timeformat(endTime),
        fletero: fletero[0],
        device: fletero[1],
        date: dateformat(date)
    };
}

socket.on('reporte', function (data) {
    createPolylines(data);
});


function createPolylines(data) {
    if (!data.length) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        createPolyline(data[i]);
    }
}


function createPolyline(data) {

    var points = data.points;

    for (var i = 0; i < points.length; i++) {

        var path = [];

        for (var j = i; j < i + 2 && j < points.length; j++) {
            path.push(points[j].position);
        }

        var line = new google.maps.Polyline(
            {
                path: path,
                strokeWeight: 1.25,
                strokeColor: '#4169E1',
                icons: [
                    {
                        icon: {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                        },
                        offset: '100%'
                    }
                ]
            }
        );

        polylines.push(line);

        line.setMap(map);
    }
}

function crearGrafico(values) {

    var rechazo = 0;
    var atendidos = 0;

    for (var i = 0; i < values.length; i++) {
        /*if (values[i].resultado === 1) {
            atendidos++;
            continue;
        }*/
        atendidos += values[i].liquidado;
        rechazo += values[i].rechazo;
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

    reporte = new Chart(resultado, {
        type: 'pie',
        data: data,
        options: {
            legend: {position: 'bottom'},
            responsive: true,
            maintainAspectRatio: true,
            pieceLabel: {
                render: 'percentage',
                fontColor: 'white',
                precision: 2
            }
        }
    });
}


function centerMap() {

    if (!customers.length) {
        return;
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < customers.length; i++) {
        bounds.extend(customers[i].getPosition());
    }

    map.fitBounds(bounds);
}


function createPDF() {
    var element = document.getElementById('mapa');
    html2canvas(element, {
        useCORS: true,
        onrendered: function (canvas) {
            var img = canvas.toDataURL('/terranorte/assets/img');
            var pdf = new jsPDF();
            pdf.text(50, 20, 'REPORTE DE SEGUIMIENTO');
            pdf.text(20, 30, 'Transporte: ' + _fletero);
            pdf.text(20, 40, 'Fecha: ' + _fecha + ' ' + _startTime + ' - ' + _endTime);
            pdf.addImage(img, 'PNG', 15, 50, 180, 150);
            pdf.save('reporte_seguimiento.pdf');
        }
    });
}