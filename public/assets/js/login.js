$('#btnactualizapass').click(function() {
  let email = $('#username').val();
  let password = $('#password').val();
  $.ajax({
    type: 'POST',
    url: '/user/login',
    data: {
      email,
      password
    },
    success: function(param) {
      console.debug(param.ok);
      if (param.ok == true) {
        $('.centrado').html('Éxito!');
        window.location('/');
      } else {
        $('#error').html('Error al iniciar sesión');
      }
    },
    error: function(error) {
      console.error(error);
    }
  });
});
