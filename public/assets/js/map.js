/**
 * Created by Edward Luna Noriega on 14/09/17.
 */

var SOCKET = io.connect('/terranorte', {'forceNew': true});
var HOVER_OFF_SET = 80000;
var ICON_CONFIG = {url: '/assets/img/marker-truck.png', labelOrigin: new google.maps.Point(25, 10)};
var infowindow = new google.maps.InfoWindow({maxWidth: 350});
var VEHICLES = {};
var TRUCKS = {};
var CLIENTS = {};
var NO_SALES = {};
var FOCUS = null;
var CLIENTS_IN_MAP = false;
var NO_SALES_IN_MAP = false;

$($.ajax({
    type: 'POST',
    url: '/prueba/app/fleteros',
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
});

SOCKET.on('device', function (data) {
    CreatePolyline(data[0]);
});


$($.ajax({
    type: 'POST',
    url: '/prueba/app/clientes/today',
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
    url: '/prueba/app/clientes/sinpedido',
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
    data.icon = '/assets/img/customer_default.png';
    var cliente = new google.maps.Marker(data);

    var content = '<div id="content"><div id="bodyContent">';
    content += '<b>CLIENTE:</b> ' + data.idcliente + ' - ' + data.nomcli;
    content += '<br><b>VENDEDOR:</b> ' + data.vendedor;
    content += '<br><b>SUPERVISOR:</b> ' + data.supervisor;
    content += '<br><b>RUTA:</b> ' + data.ruta;
    content += '<br><b>TIPO NEGOCIO:</b> ' + data.tiponego;
    content += '<br><b>DIRECCIÓN:</b> ' + data.domicli;

    content += '</div></div>';

    cliente.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(MAP, cliente);
    });

    CLIENTS[data.idcliente] = cliente;

    //cliente.setMap(MAP);
}

function SaveNoSalesMarkers(data) {
    data.icon = '/assets/img/customer_reject.png';
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

    NO_SALES[data.idcliente] = sinpedido;
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

function focusVehicle(vehicle) {
    
    infowindow.close();
    FOCUS = vehicle;

    if (CLIENTS_IN_MAP) {
        borrarClientes();
        mostrarClientes();
    }

    if (!vehicle) {
        //MAP.setZoom(12);
        MAP.setCenter(MAP_CENTER);
    }

    $.each(VEHICLES, function (key, item) {
        if (vehicle !== key && vehicle) {
            return item.setMap(null);
        }
        if (vehicle) {
            MAP.setZoom(16);
            MAP.setCenter(item.getPosition());
        }
        item.setMap(MAP);
    });

    if(vehicle && VEHICLES.hasOwnProperty(vehicle)) {
        SOCKET.emit('vehiculo', { device: VEHICLES[vehicle].device, limit: 8 });
    }
}


function borrarClientes() {
    CLIENTS_IN_MAP = false;
    $.each(CLIENTS, function (key, item) {
        item.setMap(null);
    });
}


function mostrarClientes() {
    if(CLIENTS_IN_MAP) {
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
    if(NO_SALES_IN_MAP){
        return ClearNoSalesInMap();    
    }    
    NO_SALES_IN_MAP = true;
    $.each(NO_SALES, function (key, item) {
        /*if (!FOCUS || item.fletero.toString() === FOCUS) {
            return item.setMap(MAP);
        }*/
        item.setMap(MAP);
    });
}

function ClearNoSalesInMap() {
    NO_SALES_IN_MAP = false;
    $.each(NO_SALES, function (key, item) {
        item.setMap(null);
    });
}


function CreatePolyline(data){
    var symbol = {path: 'M -2,0 0,-2 2,0 0,2 z', strokeColor: '#F00', fillColor: '#F00', fillOpacity: 1};
    var points = data.points;
    var path = [];
    for(var i = 0; i < points.length; i++){
        var point = points[i];
        point.icon = symbol;
        var marker = new google.maps.Marker(point);
        path.push(point.position);
        marker.setMap(MAP);
    }
    var line = new google.maps.Polyline({path: path});

    line.setMap(MAP);
}







