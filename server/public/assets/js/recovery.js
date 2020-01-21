$('#btnactualizapass').click(function() {
    let pass1 = $('#password_one').val();
    let pass2 = $('#password_two').val();

    if (pass1 != pass2) {
        $('#error').html('Las contraseñas no coinciden');
    } else {
        $.ajax({
            type: 'POST',
            // url: 'localhost:3000/updatepass',
            url: 'https://restservernode-ar.herokuapp.com/updatepass',
            data: {
                token: $('#token').val()
            },
            success: function(param) {
                console.log(param);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
    console.log(pass1, pass2);
});