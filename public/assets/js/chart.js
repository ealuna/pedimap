/**
 * Created by Edward Luna Noriega on 03/10/17.
 */


var ctx = document.getElementById('myChart').getContext('2d');
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
