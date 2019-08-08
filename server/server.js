const express = require('express');
const socketIO = require('socket.io');
// const server = require('http').Server(app);
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion con el backend
module.exports.io = socketIO(server);
require('./sockets/socket');


server.listen(port, (err)=> {
    if (err) throw new Error(err);
    console.log(`Escuchando en el puerto ${port}`)
});