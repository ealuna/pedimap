$(document).on("ready", function () {

    $.post(baseurl + "prueba/actualizararticulos_c/get_marca",
            function (data) {
                var c = JSON.parse(data);
                $.each(c, function (i, item) {
                    $('#select-marca').append('<option value="' + item.codmarca + '">' + item.descmarca + '</option>');
                });
            });

    $('#select-marca').change(function () {
        $('#select-linea').html('');
        $('#select-producto').html('');
        $('#select-articulo').html('');
        $('#cbxconsulta1').html('');
        $('#select-marca option:selected').each(function () {
            var n = $('#select-marca').val();
            $.post(baseurl + "prueba/actualizararticulos_c/get_linproduct", {
                "codmarca": n}, function (data) {
                $('#select-linea').append('<option value="0">[ESCOGER UNA LINEA]</option>');
                $('#select-producto').append('<option value="0">[ESCOGER UN GENÉRICO]</option>');
                $('#select-articulo').append('<option value="0">[ELEGIR ARTICULO]</option>');
                var c = JSON.parse(data);
                $.each(c, function (i, item) {
                    $('#select-linea').append('<option value="' + item.codlin + '">' + item.linprodu + '</option>');
                });
            });
        });
    });

    $('#select-linea').change(function () {
        $('#select-producto').html('');
        $('#select-articulo').html('');
        $('#cbxconsulta1').html('');
        $('#select-linea option:selected').each(function () {
            var n = $('#select-linea').val();
            $.post(baseurl + "prueba/actualizararticulos_c/get_geneart", {
                "codlin": n}, function (data) {
                $('#select-producto').append('<option value="0">[ESCOGER UN GENÉRICO]</option>');
                $('#select-articulo').append('<option value="0">[ELEGIR ARTICULO]</option>');
                var c = JSON.parse(data);
                $.each(c, function (i, item) {
                    $('#select-producto').append('<option value="' + item.codgene + '">' + item.descrip + '</option>');
                    $('#cbxconsulta1').append('<option value="' + item.codgene + '">' + item.descrip + '</option>');
                });
            });
        });
    });

    $('#select-producto').change(function () {
        $('#select-articulo').html('');
        $('#cbxconsulta1').html('');
        $('#select-producto option:selected').each(function () {
            var n = $('#select-producto').val();
            $.post(baseurl + "prueba/actualizararticulos_c/get_articulo", {
                "codgene": n}, function (data) {
                $('#select-articulo').append('<option value="0">[ELEGIR ARTICULO]</option>');
                var c = JSON.parse(data);
                $.each(c, function (i, item) {
                    $('#select-articulo').append('<option value="' + item.codart + '">' + item.descrip + '</option>');
                });
            });
        });
    });

    $('#btnagregar').click(function () {
        var dato = $('#select-producto').val();
        if (dato == 0) {
            alert("Error: debe escoger primero un genérico");
        } else {
            $('#cbxconsulta1').val(dato);
            $('#modal-agregar').modal("show");
        }
    });

});

