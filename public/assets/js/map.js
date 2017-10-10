/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var SOCKET = io.connect('/terranorte', {'forceNew': true});
var HOVER_OFF_SET = 80000;
var ICON_CONFIG = {url: '/assets/img/marker-truck.png', labelOrigin: new google.maps.Point(25, 10), anchor: new google.maps.Point(7, 20)};
//var clusterer = new Clusterer(MAP);
var infowindow = new google.maps.InfoWindow({maxWidth: 350});
var VEHICLES = {};
var TRUCKS = {};
var CLIENTS = {};
var ROUTES = {};
var NO_SALES = [];
var FOCUS = null;
var CLIENTS_IN_MAP = false;
var NO_SALES_IN_MAP = false;
var ROUTES_IN_MAP = null;
var FOCUS_POLYLINE = null;
//var FOCUS_POLYLINE_POINTS = [];

$($.ajax({
    type: 'POST',
    url: '/terranorte/app/fleteros',
    contentType: "application/json",
    data: JSON.stringify({fecha: new Date(), fletero: null}),
    success: function (result) {
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            var id = result[i].numcam;
            TRUCKS[id] = result[i];
        }
    }
}));

SOCKET.on('flota', function (data) {
    iterarflota(data);
    RefreshPolyline();
});

SOCKET.on('device', function (data) {
    console.log(data);
    CreatePolyline(data[0]);
});


$($.ajax({
    type: 'POST',
    url: '/terranorte/app/clientes/today',
    success: function (result) {
        //console.log(result);
        for (var j = 0; j < result.length; j++) {
            //var id = result[i].idcliente;
            //CLIENTS[id] = result[i];
            viewClientInMap(result[j]);
        }
    }
}));

$($.ajax({
    type: 'POST',
    url: '/terranorte/app/rutas/today',
    success: function (result) {
        //console.log(result);
        for (var j = 0; j < result.length; j++) {
            //var id = result[i].idcliente;
            //CLIENTS[id] = result[i];
            SavePolygons(result[j]);
        }
    }
}));


$($.ajax({
    type: 'POST',
    url: '/terranorte/app/clientes/sinpedido',
    success: function (result) {
        console.log(result);
        for (var j = 0; j < result.length; j++) {
            //var id = result[i].idcliente;
            //CLIENTS[id] = result[i];
            SaveNoSalesMarkers(result[j]);
        }
    }
}));

function iterarflota(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].zIndex = HOVER_OFF_SET + i;
        prepareMarker(data[i]);
    }
    console.log(VEHICLES);
}


function viewClientInMap(data) {
    data.icon = data.estado === 0 ? '/assets/img/customer_default.png' : data.estado === 1 ? '/assets/img/customer_success.png' : '/assets/img/customer_reject.png';
    var cliente = new google.maps.Marker(data);

    var content = '<div id="content"><div id="bodyContent">';
    content += '<b>CLIENTE:</b> ' + data.idcliente + ' - ' + data.nomcli;
    content += '<br><b>VENDEDOR:</b> ' + data.vendedor;
    content += '<br><b>SUPERVISOR:</b> ' + data.supervisor;
    content += '<br><b>RUTA:</b> ' + data.ruta;
    content += '<br><b>TIPO NEGOCIO:</b> ' + data.tiponego;
    content += '<br><b>DIRECCIÓN:</b> ' + data.domicli;
//content += '<input type="button" value ="prueba" />';
    content += '</div></div>';

    cliente.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(MAP, cliente);
    });

    CLIENTS[data.idcliente] = cliente;

    //cliente.setMap(MAP);
}

function SaveNoSalesMarkers(data) {
    //var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#F00', fillColor: '#F00', fillOpacity: 1};
    data.icon = '/assets/img/marker_no_sales_3.png';
    data.icon = '/assets/img/no_sales_marker.png';
    //data.icon = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#F00', fillColor: '#F00', fillOpacity: 1};
    var sinpedido = new google.maps.Marker(data);

    var content = '<div id="content"><div id="bodyContent">';
    content += '<b>CLIENTE:</b> ' + data.idcliente + ' - ' + data.nomcli;
    content += '<br><b>VENDEDOR:</b> ' + data.vendedor;
    content += '<br><b>SUPERVISOR:</b> ' + data.supervisor;
    content += '<br><b>RUTA:</b> ' + data.ruta;
    content += '<br><b>TIPO NEGOCIO:</b> ' + data.tiponego;
    content += '<br><b>DIRECCIÓN:</b> ' + data.domicli;
    content += '</div></div>';

    sinpedido.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(MAP, sinpedido);
    });
    NO_SALES.push(sinpedido);
    //NO_SALES[data.idcliente] = sinpedido;
    //cliente.setMap(MAP);
}

function prepareMarker(data) {
    data.icon = ICON_CONFIG;
    data.label = {text: data.id.toString(), fontSize: '11px'};

    var vehiculo = new google.maps.Marker(data);

    var content = '<div id="content"><div id="bodyContent"><b>TRANSPORTE:</b> ';
    content += TRUCKS.hasOwnProperty(data.id) ? TRUCKS[data.id].nombre : data.id + ' - TRANSPORTE NO ASIGNADO';
    content += '<br><b>DIRECCIÓN:</b> ' + data.location;
    content += '<br><b>HORA:</b> ' + data.datetime;
    content += '</div></div>';

    vehiculo.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(MAP, vehiculo);
    });

    saveVehicle(vehiculo);
}


function saveVehicle(vehiculo) {
    var id = vehiculo.id;

    if (VEHICLES.hasOwnProperty(id)) {
        VEHICLES[id].setMap(null);
        if (FOCUS === null || id.toString() === FOCUS) {
            vehiculo.setMap(MAP);
        }
    } else {
        if (FOCUS === null) {
            vehiculo.setMap(MAP);
        }
    }
    VEHICLES[id] = vehiculo;
}


function RefreshPolyline() {
    ClearPolylineInMap();
    if (FOCUS && VEHICLES.hasOwnProperty(FOCUS)) {
        SOCKET.emit('vehiculo', {id: VEHICLES[FOCUS].device, limit: 50});
    }
}

function focusVehicle(vehicle) {

    infowindow.close();
    FOCUS = vehicle;

    if (CLIENTS_IN_MAP) {
        borrarClientes();
        mostrarClientes();
    }

    if (!vehicle) {
        MAP.setZoom(12);
        MAP.setCenter(MAP_CENTER);
    }

    $.each(VEHICLES, function (key, item) {
        if (vehicle !== key && vehicle) {
            return item.setMap(null);
        }
        if (vehicle) {
            //MAP.setZoom(16);
            MAP.setCenter(item.getPosition());
        }
        item.setMap(MAP);
    });
//console.log(VEHICLES[vehicle].device)
    RefreshPolyline();
}


function borrarClientes() {
    CLIENTS_IN_MAP = false;
    $.each(CLIENTS, function (key, item) {
        item.setMap(null);
    });
}


function mostrarClientes() {
    if (CLIENTS_IN_MAP) {
        return borrarClientes();
    }
    //borrarClientes();
    CLIENTS_IN_MAP = true;
    $.each(CLIENTS, function (key, item) {
        if (!FOCUS || item.fletero.toString() === FOCUS) {
            return item.setMap(MAP);
        }
        //item.setMap(null);
    });
}

function ShowNoSalesInMap() {
    if (NO_SALES_IN_MAP) {
        return ClearNoSalesInMap();
    }
    NO_SALES_IN_MAP = true;

    for(var i = 0; i < NO_SALES.length; i++){
        ShowInMap(NO_SALES[i]);
    }
    //$.each(NO_SALES, function (key, item) {
        /*if (!FOCUS || item.fletero.toString() === FOCUS) {
         return item.setMap(MAP);
         }*/
        //item.setMap(MAP);
    //});
}

function ShowInMap(marker){
    setTimeout(function () {
        //clusterer.AddMarker(marker, 'hola');
        marker.setMap(MAP);
    }, 1);
}

function ClearInMap(marker){
    setTimeout(function () {
        //clusterer.RemoveMarker(marker);
        marker.setMap(null);
    }, 1);
}


function ClearNoSalesInMap() {
    NO_SALES_IN_MAP = false;
    /*$.each(NO_SALES, function (key, item) {
        item.setMap(null);
    });*/
    for(var i = 0; i < NO_SALES.length; i++){
        ClearInMap(NO_SALES[i]);
        //NO_SALES[i].setMap(null);
    }
}


function CreatePolyline(data) {

    ClearPolylineInMap();

    //var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#F00', fillColor: '#F00', fillOpacity: 1};
    //var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#000000', fillColor: '#000000', fillOpacity: 1};
    var points = data.points;
    var path = [];

    for (var i = 0; i < points.length; i++) {

        var point = points[i];
        //point.icon = symbol;
        //var marker = new google.maps.Marker(point);

        path.push(point.position);
        //FOCUS_POLYLINE_POINTS.push(marker);

        //marker.setMap(MAP);
    }
    var line = new google.maps.Polyline({path: path});

    FOCUS_POLYLINE = line;

    line.setMap(MAP);
}

function ClearPolylineInMap() {
    if (FOCUS_POLYLINE) {
        FOCUS_POLYLINE.setMap(null);
        FOCUS_POLYLINE = null;
    }
    /*if (FOCUS_POLYLINE_POINTS.length) {
        for (var i = 0; i < FOCUS_POLYLINE_POINTS.length; i++) {
            FOCUS_POLYLINE_POINTS[i].setMap(null);
        }
        FOCUS_POLYLINE_POINTS = [];
    }*/
}

function ClearCustomersInMap() {
    ClearNoSalesInMap();
    borrarClientes();
}

function SavePolygons(ruta) {
    var arrayCords = [];
    var coords = ruta.coords.match(/\([^\(\)]+\)/g);
    if (coords !== null) {
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i].match(/-?\d+\.?\d*/g);
            if (coord !== null) {
                for (var j = 0; j < coord.length; j += 2) {
                    var point = {lng: Number(coord[j]), lat: Number(coord[j + 1])};
                    arrayCords.push(point);
                }
            }
        }
    }

    var polygon = new google.maps.Polygon({
        ruta: ruta.ruta,
        vendedor: ruta.vendedor,
        supervisor: ruta.supervisor,
        center: ruta.position,
        paths: arrayCords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        //fillColor: '#FF0000',
        fillOpacity: 0
    });

    var content = '<div id="content"><div id="bodyContent">';
    content += '<b>RUTA:</b> ' + ruta.ruta;
    content += '<br><b>VENDEDOR:</b> ' + ruta.vendedor;
    content += '<br><b>SUPERVISOR:</b> ' + ruta.supervisor;
    content += '</div></div>';

    google.maps.event.addListener(polygon, 'click', function(event) {
        infowindow.setContent(content);
        infowindow.setPosition(event.latLng);
        infowindow.open(MAP);
    });

    ROUTES[ruta.ruta] = polygon;
}

/*SOCKET.on('recibido', function (data) {
    alert(data);
});*/


function ShowPolygonsInMap() {
    //SOCKET.emit('Prueba', 'HOLA MIRA ESTA PRUEBA');
    if (ROUTES_IN_MAP) {
        return ClearPolygonsInMap();
    }
    //borrarClientes();
    ROUTES_IN_MAP = true;
    $.each(ROUTES, function (key, item) {
        /*if (!FOCUS || item.fletero.toString() === FOCUS) {
         return item.setMap(MAP);
         }*/
        item.setMap(MAP);
    });
}

function ClearPolygonsInMap() {
    ROUTES_IN_MAP = false;
    $.each(ROUTES, function (key, item) {
        item.setMap(null);
    });
}


SOCKET.on('entregado', function (data) {
    infowindow.close();
    var id = data.cliente;
    var marker = CLIENTS[id];

    var content = '<div id="content"><div id="bodyContent">';
    content += '<b>Cliente:</b> ' + marker.idcliente + ' - ' + marker.nomcli;
    content += '<br><b>Resultado:</b> ';
    content += data.resultado === 1 ? 'Entregado' : 'Rechazado';
//content += '<input type="button" value ="prueba" />';
    content += '</div></div>';

    infowindow.setContent(content);
    infowindow.open(MAP, marker);
    setTimeout(infowindow.close, 5000);

    CLIENTS[id].setIcon(data.resultado === 1 ? '/assets/img/customer_success.png':'/assets/img/customer_reject.png');
});

