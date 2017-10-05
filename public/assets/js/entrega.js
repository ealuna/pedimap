/**
 * Created by Edward Luna Noriega on 05/10/17.
 */
var productotabla = $('#tablaproducto').DataTable({
    'destroy': true,
    //"scrollY": "400px",
    'language': {
        "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"},
    dom: 'Brtip', //'Bfrtip',
    //select: true,
    buttons: [
        //'copy', 'excel', 'pdf'
        {
            extend: 'copy',
            text: '<i class="fa fa-clone"></i>',
            titleAttr: 'Copiar datos',
            title: 'Cartera de clientes con mostradores',
            exportOptions: {
                columns: ':visible'/*,
                 modifier: {
                 selected: true
                 }*/
            }
        }, {
            extend: 'colvis',
            titleAttr: 'Ocultar o mostrar columnas',
            text: '<i class="fa fa-eye"></i>'
        }, {
            extend: 'excel',
            text: '<i class="fa fa-file-excel-o"></i>',
            titleAttr: 'Exportar a excel',
            title: 'Cartera de clientes con mostradores',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'pdf',
            titleAttr: 'Exportar a PDF',
            text: '<i class="fa fa-file-pdf-o"></i>',
            title: 'Cartera de clientes con mostradores',
            exportOptions: {
                columns: ':visible'}
        }, {
            text: '<i class="fa fa-plus-circle"></i>',
            titleAttr: 'Asignar nuevo mostrador a un cliente',
            action: function () {
                asignar_mostrador();
            }
        }
    ],
    "paging": true,
    'filter': true,
    'stateSave': false,
    'ajax': {
        "url": baseurl + "oriunda/reporte_mostradores/mostrar_mostrador",
        "type": "POST",
        data: {textsupervisor: supervisor, cbxesquema: esquema, estado: estado, desde: desde, hasta: hasta, textmapa: buscar, textarealinproducto: codlin, textareageneart: codgene, equipo: equipo},
        dataSrc: ''
    },
    'columns': [
        {data: 'idcliente'},
        {data: 'nomcli'},
        {data: 'descnego'},
        {data: 'modeloequipo'},
        {data: 'fechaequipo'},
        {data: 'codven'},
        {data: 'd_perso'},
        {data: 'ruta'},
        {data: 'dia'},
        {data: 'anulado'},
        {data: 'suma', render: $.fn.dataTable.render.number(',', '.', 2, '')}, //solo mostrar dos decimales
        {"orderable": true,
            render: function (data, type, row) {//datatoggle es para abrir el modal
                return '<span class="pull-right">' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">' +
                    'Acciones' +
                    '<span class="caret"></span>' +
                    '<span class="sr-only">Toggle Dropdown</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-right" role="menu">' +
                    '<li><a onclick="selventas(' + row.idcliente + ')"><i style="color: green" class="fa fa-cubes"></i>Ventas</a></li>' +
                    '<li><a onClick="selMantenimiento(\'' + row.idcliente + '\',\'' + row.nomcli + '\',\'' + row.domicli + '\',\'' + row.descnego + '\',\'' + row.codmost + '\')"><i style="color: orange" class="glyphicon glyphicon-edit"></i>Cambiar producto</a></li>' +
                    '<li><a onClick="selEliminar(\'' + row.idcliente + '\',\'' + row.nomcli + '\',\'' + row.domicli + '\',\'' + row.descnego + '\',\'' + row.codmost + '\')"><i style="color: red" class="glyphicon glyphicon-remove"></i>Anular producto</a></li>' +
                    '<li><a onclick="datos_marker(' + row.YCoord + ',' + row.XCoord + ',' + row.idcliente + ')"><i style="color: blue" class="glyphicon glyphicon-map-marker"></i>Ubicar cliente</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</span>';
            }
        }
    ],
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
    ]
});

/*
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/plugins/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">




 <script src="<?php echo base_url(); ?>assets/plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
 <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
 <script src="<?php echo base_url(); ?>assets/plugins/datatables/dataTables.bootstrap.min.js" type="text/javascript"></script>
 <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.4.1/js/dataTables.buttons.min.js"></script>
 <script type="text/javascript" src="//cdn.datatables.net/buttons/1.4.1/js/buttons.flash.min.js"></script>
 <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
 <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
 <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
 <script type="text/javascript" src="//cdn.datatables.net/buttons/1.4.1/js/buttons.html5.min.js"></script>
 <script type="text/javascript" src="//cdn.datatables.net/buttons/1.4.1/js/buttons.print.min.js"></script>
 <script type="text/javascript" src="//cdn.datatables.net/buttons/1.4.1/js/buttons.colVis.min.js"></script>
 <script type="text/javascript" src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    */