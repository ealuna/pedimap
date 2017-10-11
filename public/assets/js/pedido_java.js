
$(document).on("ready", function () {

    var id = "", des = "", cant = "";
    var data =
            [
        {"ndoc": "84569352", "tipodoc": "BOLETA", "nomcli": "Luis Zanzara Mateo", "monto": "7850", "estado": "Pendiente", "codart": "683031", "art": "ACEITE CAPRI 12 * 1 LITRO"},
        {"ndoc": "24339772", "tipodoc": "BOLETA", "nomcli": "Gamora Zandar Quill", "monto": "1111", "estado": "Cerrado", "codart": "683030", "art": "ACEITE CAPRI 24*500CC"},
        {"ndoc": "87788352", "tipodoc": "FACTURA", "nomcli": "Luis Zanzara Mateo", "monto": "320", "estado": "Pendiente", "codart": "683150", "art": "AVENA ANGEL QUINUA 12*270GR."},
        {"ndoc": "11569711", "tipodoc": "BOLETA", "nomcli": "Luis Drax Groot", "monto": "253", "estado": "Cerrado", "codart": "681373", "art": "CARAME.CHICHA SAYON 20*120UN."},
        {"ndoc": "77581662", "tipodoc": "BOLETA", "nomcli": "Cajahuaringa Leto Hugo", "monto": "450", "estado": "Pendiente", "codart": "682107", "art": "DET.BOLIV. EVOLUTION 30*360GR."},
        {"ndoc": "13768331", "tipodoc": "FACTURA", "nomcli": "Zevallos Dante Luis", "monto": "18570", "estado": "Pendiente", "codart": "683041", "art": "DET.MARS.PETA.RELAJ. 15*850GR."}
                /*["84569352", "BOLETA", "Luis Zanzara Mateo", "7850", "Pendiente"],
                ["24339772", "BOLETA", "Gamora Zandar Quill", "1111", "Cerrado"],
                ["87788352", "FACTURA", "Luis Zanzara Mateo", "320", "Pendiente"],
                ["11569711", "BOLETA", "Luis Drax Groot", "253", "Cerrado"],
                ["77581662", "BOLETA", "Cajahuaringa Leto Hugo", "450", "Pendiente"],
                ["13768331", "FACTURA", "Zevallos Dante Luis", "18570", "Pendiente"]*/
            ];
    $('#tabla1').DataTable({
        "scrollX": true,
        'destroy': true,
        'language': {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },

        "paging": true,
        'filter': true,
        'stateSave': true,
        'ajax': {
            "url": "prueba/pedido/productos",
            "type": "POST",
            "data": "",
            dataSrc: ''
        }, 'columns': [
            {data: 'codart'},
            {data: 'descrip'},
            {data: 'codpreres'},
            {data: 'resto'},
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
                            '<li><a onclick="datos(\'' + row.codart + '\',\'' + row.descrip + '\')"><i style="color: green" class="fa fa-cubes"></i>AGREGAR PEDIDO</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</span>';
                }
            }
        ]
    });

    $('#tabla2').DataTable({
        "scrollX": true,
        'destroy': true,
        'language': {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },

        "paging": true,
        'filter': true,
        'stateSave': true,
        data: data
        ,
        'columns': [
            {data: 'ndoc'},
            {data: 'tipodoc'},
            {data: 'nomcli'},
            {data: 'monto'},
            {data: 'estado'},
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
                            '<li><a onclick="date(\'' + row.codart + '\',\'' + row.art + '\')" ><i style="color: green" class="fa fa-cubes"></i>DETALLE PEDIDO</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</span>';
                }
            }
        ]
    });
});

datos = function (cod, art) {
    $('#modal-1').modal("show");
    $('#codart').val(cod);
    $('#descript').val(art);
};

date = function (cod, art) {
    $('#modal-2').modal("show");
    $('#cod').val(cod);
    $('#art').val(art);
};


$('#agregar').click(function () {
    id = document.getElementById("codart").value;
    cant = document.getElementById("cant").value;
    localStorage.setItem("id", id);
    localStorage.setItem("num", cant);
    console.log(localStorage.id);
    console.log(localStorage.num);
});