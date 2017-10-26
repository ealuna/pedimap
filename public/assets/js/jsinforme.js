/**
 * Created by Edward Luna Noriega on 16/10/17.
 */

//var socket = io.connect('/terranorte', {'forceNew': true});
var reporte_pie = document.getElementById('reporte_pie').getContext('2d');
var reporte_line = document.getElementById('reporte_line').getContext('2d');
var reporte_bar = document.getElementById('reporte_bar').getContext('2d');
var reporte_bar_horizontal = document.getElementById('reporte_bar_horizontal').getContext('2d');
var color_pendiente = 'rgb(132, 134, 137)';
var color_atendido = 'rgb(16, 209, 69)';
var color_rechazo = 'rgb(209, 41, 44)';
/*
 socket.on('flota', function (data) {
 console.log(data)
 //createTable(data);
 });
 */

function getNow() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;

    if (mm < 10) mm = '0' + mm;

    return yyyy + '/' + mm + '/' + dd;
}

function createTable(data) {
    var fleteros = $('#fleteros').DataTable({
        'destroy': true,
        'language': {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        dom: 'frtip',
        "paging": true,
        'filter': true,
        responsive: true,
        'stateSave': false,
        data: data,
        'columns': [
            {
                "orderable": true,
                render: function (data, type, row) {//datatoggle es para abrir el modal
                    return '<i class="fa fa-truck" aria-hidden="true"></i> <span>' + row.id + '</span>';
                }
            },
            {data: 'vehicle'},
            {data: 'location'},
            {data: 'status'},
            {data: 'datetime'}
        ]
    });

    new $.fn.dataTable.FixedHeader(fleteros);
}


$(function () {

    $.ajax({
        type: 'POST',
        url: '/terranorte/app/fleteros/entregas',
        contentType: "application/json",
        data: JSON.stringify({fecha: getNow()}),
        success: function (result) {
            var dataset = cargarBarDataset(result);
            crearGraficoBarras(dataset);
        }
    });

    $.ajax({
        type: 'POST',
        url: '/terranorte/app/documentos/entregas',
        contentType: "application/json",
        data: JSON.stringify({fecha: getNow()}),
        success: function (result) {
            var dataset = cargarPieDataset(result);
            crearGraficoPie(dataset);
        }
    });

    $.ajax({
        type: 'POST',
        url: '/terranorte/app/documentos/entregas_horas',
        contentType: "application/json",
        data: JSON.stringify({fecha: getNow()}),
        success: function (result) {
            var dataset = cargarLineDataset(result);
            crearGraficoLineas(dataset);
        }
    });

});


function cargarLineDataset(data) {
    var horas = [];
    var atendidos = [];
    var rechazos = [];
    var pendientes = [];

    for (var i = 0; i < data.length; i++) {
        horas.push(data[i].hora);
        atendidos.push(data[i].atendidos);
        rechazos.push(data[i].rechazados);
        pendientes.push(data[i].pendientes);
    }


    return {
        labels: horas,
        datasets: [
            {
                label: 'Atendidos',
                borderColor: color_atendido,
                backgroundColor: color_atendido,
                data: atendidos,
                fill: false
            }, {
                label: 'Rechazo',
                borderColor: color_rechazo,
                backgroundColor: color_rechazo,
                data: rechazos,
                fill: false
            }, {
                label: 'Pendientes',
                borderColor: color_pendiente,
                backgroundColor: color_pendiente,
                data: pendientes,
                fill: false
            }
        ]
    };
}


function crearGraficoLineas(data) {
    new Chart(reporte_line, {
        type: 'line',
        data: data,
        options: {
            legend: {
                display: true,
                position: 'top'
            },
            responsive: true,
            maintainAspectRatio: true,
            pointDotRadius: 10,
            bezierCurve: false,
            scaleShowVerticalLines: false,
            scaleGridLineColor: 'black'
        }
    });
}

function cargarPieDataset(data) {

    if (!data || !data.length) {
        return;
    }

    var value = data[0];

    return {
        datasets: [{
            data: [value.entregado, value.rechazado, value.pendiente],
            backgroundColor: [
                color_atendido,
                color_rechazo,
                color_pendiente
            ]
        }],
        labels: [
            'Atendidos: S/.' + value.entregado,
            'Rechazo: S/.' + value.rechazado,
            'Pendientes: S/.' + value.pendiente,
        ]
    };

}

function cargarBarDataset(data) {

    if (!data || !data.length) {
        return;
    }

    var fleteros = [];
    var pendiente = [];
    var atendidos = [];
    var rechazo = [];

    for (var i = 0; i < data.length; i++) {
        fleteros.push(data[i].fletero);
        pendiente.push(data[i].pendiente);
        atendidos.push(data[i].entregado);
        rechazo.push(data[i].rechazado);
    }

    return {
        labels: fleteros,
        datasets: [
            {
                label: "Atendido",
                backgroundColor: color_atendido,
                data: atendidos
            }, {
                label: "Rechazado",
                backgroundColor: color_rechazo,
                data: rechazo
            }, {
                label: "Pendiente",
                backgroundColor: color_pendiente,
                data: pendiente
            }
        ]
    };

}

function crearGraficoPie(data) {

    new Chart(reporte_pie, {
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


function crearGraficoBarras(data) {
    new Chart(reporte_bar, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            title: {
                display: true,
                text: 'Estado de Entregas por Transporte'
            },
            pointDotRadius: 10,
            bezierCurve: false,
            scaleShowVerticalLines: false,
            scaleGridLineColor: 'black'
        }
    });
    new Chart(reporte_bar_horizontal, {
        type: 'horizontalBar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Estado de Entregas por Transporte'
            },
            pointDotRadius: 10,
            bezierCurve: false,
            scaleShowVerticalLines: false,
            scaleGridLineColor: 'black'
        }
    });
}


