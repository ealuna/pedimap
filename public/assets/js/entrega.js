/**
 * Created by Edward Luna Noriega on 05/10/17.
 */

var socket = io.connect('/terranorte', {'forceNew': true});

var clientes = $('#clientes').DataTable({
    'destroy': true,
    'language': {
        "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    },
    dom: 'frtip',
    "paging": true,
    'filter': true,
    responsive: true,
    'stateSave': false,
    'ajax': {
        "url": "/terranorte/app/clientes/despacho",
        "type": "POST",
        data: {fecha: getNow(), fletero: 588},
        dataSrc: ''
    },
    'columns': [
        {data: 'idcliente'},
        {data: 'nomcli'},
        {data: 'domicli'},
        {data: 'tiponego'},
        {data: 'ruta'},
        {
            "orderable": true,
            render: function (data, type, row) {//datatoggle es para abrir el modal
                return '<span class="pull-right">' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                    'Registar ' +
                    '<span class="caret"></span>' +
                    '<span class="sr-only">Toggle Dropdown</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-right" role="menu">' +
                    '<li><a onClick="EnviarResultado(\'' + row.codprov + '\',\'' + row.tipopla + '\',\'' + row.seriepla + '\',\'' + row.nropla + '\',\'' + row.idcliente + '\', 1)"><i style="color: green" class="glyphicon glyphicon-ok-circle"></i>Entregado</a></li>' +
                    '<li><a onClick="EnviarResultado(\'' + row.codprov + '\',\'' + row.tipopla + '\',\'' + row.seriepla + '\',\'' + row.nropla + '\',\'' + row.idcliente + '\', 2)"><i style="color: red" class="glyphicon glyphicon-remove-circle"></i>Rechazado</a></li>' +
                    //'<li><a onclick="datos_marker(' + row.YCoord + ',' + row.XCoord + ',' + row.idcliente + ')"><i style="color: blue" class="glyphicon glyphicon-map-marker"></i>Ubicar cliente</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</span>';
            }
        }
    ]  /*
     "columnDefs": [
     {
     "targets": [9],
     "data": "anulado",
     "render": function (data, type, row) {
     if (data === 0) {
     return "<span class='label label-success'>Activo</span>";
     } else if (data === 1) {
     return "<span class='label label-danger'>Anulado</span>";
     }
     }
     }
     ]*/
});

new $.fn.dataTable.FixedHeader(clientes);


function EnviarResultado(codprov, tipopla, seriepla, nropla, cliente, resultado) {
    socket.emit('resultado', {
        codprov: codprov,
        tipopla: tipopla,
        seriepla: seriepla,
        nropla: nropla,
        cliente: cliente,
        resultado: resultado
    });
}

function getNow() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;

    if (mm < 10) mm = '0' + mm;

    return yyyy + '/' + mm + '/' + dd;
}