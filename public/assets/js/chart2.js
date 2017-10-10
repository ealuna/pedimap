/**
 * Created by Edward Luna Noriega on 03/10/17.
 */


var ctx = document.getElementById('myChart').getContext('2d');

function GenerarReporte() {
    $.ajax({
        type: 'POST',
        url: '/terranorte/app/reporte/indicador2',
        contentType: "application/json",
        data: JSON.stringify({fechainicial: init, fechafinal: to}),
        success: function (result) {
            console.log(result);
            ExtraerDatos(result);
            CrearTabla(result);
        }
    })
}

function ExtraerDatos(result) {
    var entregados = 0;
    var completos = 0;
    for (var i = 0; i < result.length; i++) {
        entregados += result[i].entregados;
        completos += result[i].completos;
    }
    CrearGrafico(entregados, entregados - completos );
}


function CrearGrafico(a, b) {
    var data = {
        datasets: [{
            data: [b, a],
            backgroundColor: [
                'rgb(209, 41, 44)',
                'rgb(16, 209, 69)'
            ]
        }],
        labels: [
            'Entregados incompletos',
            'Entregados completos'
        ]
    };

    var myDoughnutChart = new Chart(ctx, {
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


function CrearTabla(data) {
    var clientes = $('#detalle').DataTable({
        'destroy': true,
        'language': {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        dom: 'frtip',
        "pageLength": 50,
        "paging": true,
        'filter': true,
        responsive: true,
        'stateSave': false,
        data: data,
        'columns': [
            {data: 'fecha'},
            {data: 'entregados'},
            {data: 'completos'},
            {data: 'resultado'}
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
}
/*
 var data = {
 datasets: [{
 data: [30, 70],
 backgroundColor: [
 'rgb(209, 41, 44)',
 'rgb(16, 209, 69)'
 ]
 }],
 labels: [
 'No cumplidos a tiempo',
 'Cumplidos a tiempo'
 ]
 };

 var myDoughnutChart = new Chart(ctx, {
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
 */