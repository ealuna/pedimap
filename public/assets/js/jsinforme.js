/**
 * Created by Edward Luna Noriega on 16/10/17.
 */

var socket = io.connect('/terranorte', {'forceNew': true});

socket.on('flota', function (data) {
    console.log(data)
    createTable(data);
});

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


function crearGraficoPie() {

    var rechazo = 123;
    var atendidos = 24234;
    var pendientes = 1234;


    var data = {
        datasets: [{
            data: [rechazo, atendidos, pendientes],
            backgroundColor: [
                'rgb(209, 41, 44)',
                'rgb(16, 209, 69)',
                'rgb(132, 134, 137)'
            ]
        }],
        labels: [
            'Rechazo: S/.' + rechazo,
            'Atendidos: S/.' + atendidos,
            'Pendientes: S/.' + pendientes,
        ]
    };

    reporte = new Chart(document.getElementById('reporte_pie').getContext('2d'), {
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

crearGraficoPie();

var speedCanvas = document.getElementById("reporte_line");


var speedData = {
    labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
    datasets: [{
        label: "Car Speed (mph)",
        data: [0, 59, 75, 20, 20, 55, 40],
    }]
};

var chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
            boxWidth: 80,
            fontColor: 'black'
        }
    }
};

var lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: speedData,
    options: chartOptions
});