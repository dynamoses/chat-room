const express = require('express');
const socket = require('socket.io')

const app = express();
const server = app.listen(3000, function() {
    console.log('listening to changes on port 3000 ygm')
})

// serve static files
app.use(express.static('public'))

// socket
const socketio = socket(server);

socketio.on('connection', function(socket) {
    console.log('socket io made connection', socket.id);

    socket.on('chatMessage', function(data) {
        socketio.sockets.emit('chatMessage', data)
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data)
    })
});