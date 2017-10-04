/**
 * Created by Edward Luna Noriega on 03/10/17.
 */


/*var ctx = document.getElementById('myChart').getContext('2d');
var data = {
    datasets: [{
        data: [10, 20, 50],
        backgroundColor: [
            'rgb(209, 41, 44)',
            'rgb(181, 181, 181)',
            'rgb(16, 209, 69)'
        ]
    }],

    labels: [
        'Rechazo',
        'Sin Atender',
        'Entregado'
    ]
};
var myDoughnutChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        legend: {position: 'bottom'},
        maintainAspectRatio: false,
        pieceLabel: {
            render: 'percentage',
            fontColor: ['white', 'white', 'white'],
            precision: 2
        }
    }
});
*/
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var data = {
    datasets: [{
        data: [30, 70],
        backgroundColor: [
            'rgb(209, 41, 44)',
            //'rgb(181, 181, 181)',
            'rgb(16, 209, 69)'
        ]
    }],

    labels: [
        'No cumplidos a tiempo',
        //'Sin Atender',
        'Cumplidos a tiempo'
    ]
};
var data2 = {
    datasets: [{
        data: [21, 79],
        backgroundColor: [
            'rgb(209, 41, 44)',
            //'rgb(181, 181, 181)',
            'rgb(16, 209, 69)'
        ]
    }],

    labels: [
        'Entregados incompletos',
        //'Sin Atender',
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

var myDoughnutChart2 = new Chart(ctx2, {
    type: 'pie',
    data: data2,
    options: {
        legend: {position: 'bottom'},
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
            render: 'percentage',
            //overlap: true,
            //  arc: true,
            fontColor: 'white',
            precision: 2
        }
    }
});