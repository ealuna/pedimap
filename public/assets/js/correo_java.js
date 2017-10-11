$(document).on("ready", function () {
    $("#compose-textarea").wysihtml5();
    $('#btnenviar').click(function () {
        correo = $('#textcorreo').val();
        alertify.confirm("¿Estás seguro de enviar este correo?", function (k) {
            if (k) {
                $.ajax({
                    url: baseurl + "prueba/correo/enviarcorreo",
                    type: "POST",
                   // data: {textcorreo: correo},
                    success: function (respuesta) {
                        if (respuesta === "exito") {
                            console.log(respuesta);
                            //alertify.alert("Correo enviado a "+correo);
                            //$('#textcorreo').val("");
                        } else if (respuesta === 'error') {
                            console.log(respuesta);
                            //alertify.alert("Error al enviar al correo : "+correo);
                        }
                    }
                });
            } else {
                alertify.alert("Se cancelo el proceso");
            }
        });
    });
});