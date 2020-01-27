$("#password_one").focus(function() {
    $('#error').html('');
})

$("#password_two").focus(function() {
    $('#error').html('');
})

$('#btnactualizapass').click(function() {
    let pass1 = $('#password_one').val();
    let pass2 = $('#password_two').val();

    if (pass1 == '' || pass2 == '') {
        $('#error').html('Necesitas llenar el formulario para continuar la actuaización de la contraseña');
    } else if (pass1 != pass2) {
        $('#error').html('Las contraseñas no coinciden');
    } else {
        $.ajax({
            type: 'POST',
            url: '/user/updatepass',
            data: {
                token: $('#token').val(),
                pass1,
                pass2
            },
            success: function(param) {
                console.log(param.ok);
                if (param.ok == true) {
                    $('.centrado').html('Contraseña actualizada exitosamente');
                } else {
                    $('#error').html('Hubo un problema interno, no se actualizó la contraseña');
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
});