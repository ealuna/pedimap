/**
 * Created by Edward Luna Noriega on 07/12/17.
 */


var _infowindow = new google.maps.InfoWindow({maxWidth: 350});


function crearInfowindowCliente(data) {
    return '<div id="content"><div id="bodyContent">'
        + '<table class="table table-striped"><tbody>'
        + '<tr><th colspan="2">' + data.cliente + '</th></tr>'
        + '<tr><td>Vendedor</td> <td>' + data.vendedor + '</td></tr>'
        + '<tr><td>Supervisor</td> <td>' + data.supervisor + '</td></tr>'
        + '<tr><td>Ruta</td> <td> ' + data.ruta + '</td></tr>'
        + '<tr><td>Tipo Negocio</td> <td>' + data.tiponego + '</td></tr>'
        + '<tr><td>Dirección</td> <td>' + data.domicilio + '</td></tr>'
        + '<tr><td>Estado</td> <td>' + data.estado + '</td></tr>'
        + '<tr><td>Importe</td> <td>S/. ' + data.importe + '</td></tr>'
        + '</tbody></table> ';
}

function crearInfowindowTransporte(data) {
    return '<div id="content"><div id="bodyContent">'
        + '<table class="table table-striped"><tbody>'
        + '<tr><th colspan="2">' + data.fletero + '</th></tr>'
        + '<tr><td>Dirección</td> <td>' + data.location + '</td></tr>'
        + '<tr><td>Dispositivo</td> <td>' + data.device + '</td></tr>'
        + '<tr><td>Estado</td> <td> ' + data.status + '</td></tr>'
        + '<tr><td>Placa</td> <td>' + data.vehicle + '</td></tr>'
        + '<tr><td>Velocidad</td> <td>' + data.kmh + ' kmh' + '</td></tr>'
        + '</tbody></table> ';
}

function crearInfowindowRuta(data) {
    return '<div id="content"><div id="bodyContent">'
        + '<table class="table table-striped"><tbody>'
        + '<tr><th colspan="2">' + data.ruta + '</th></tr>'
        + '<tr><td>Vendedor</td> <td>' + data.vendedor + '</td></tr>'
        + '<tr><td>Supervisor</td> <td>' + data.supervisor + '</td></tr>'
        + '<tr><td>Ruta</td> <td> ' + data.ruta + '</td></tr>'
        + '<tr><td>Clientes</td> <td> ' + data.clientes + '</td></tr>'
        + '<tr><td>Importe</td> <td>' + data.total + '</td></tr>'
        + '</tbody></table> ';
}

function crearPolygonRuta(data) {
    return new google.maps.Polygon({
        ruta: data.ruta,
        vendedor: data.vendedor,
        supervisor: data.supervisor,
        center: data.position,
        paths: data.coords,
        strokeColor: data.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0
    });
}

function crearMarkerCliente(data) {
    return new google.maps.Marker({
        ruta: data.ruta,
        vendedor: data.vendedor,
        supervisor: data.supervisor,
        center: data.position,
        paths: data.coords,
    });
}

function crearMarkerTransporte(data) {
    return new google.maps.Marker({
        ruta: data.ruta,
        vendedor: data.vendedor,
        supervisor: data.supervisor,
        icon: {
            url: '/assets/img/marker-truck.png',
            labelOrigin: new google.maps.Point(25, 10),
            anchor: new google.maps.Point(7, 20)
        },
        zIndex: data.zIndex
    });
}