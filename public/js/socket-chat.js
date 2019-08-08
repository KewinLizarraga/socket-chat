var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios.');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuario conectados ', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

// Enviar informacion
// socket.emit('crearMensaje', {
//     usuario: 'Juan',
//     mensaje: 'Hola xD'
// }, function(resp) {
//     console.log('Se disparo el callback', resp);
// });

// Escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// Escuchar cambios de usuario
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});