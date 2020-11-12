const socket = io.connect('http://localhost:3000');
const username = document.getElementById('username');
const message = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
const output = document.getElementById('output');
const typingMessage = document.getElementById('typingMessage');
let randomColor;

sendButton.addEventListener('click', function() {
    socket.emit('chatMessage', {
        username: username.value,
        message: message.value
    })
});

message.addEventListener('keypress', function() {
    socket.emit('typing', username.value)
})

socket.on('chatMessage', function(data) {
    output.innerHTML +='<p class="message"><strong>' + data.username + ':&nbsp;</strong>' + data.message + '</p>';
    typingMessage.innerHTML = '';
    message.value = '';
})

socket.on('typing', function(data) {
    typingMessage.innerHTML ='<p><em>' + data + ' is typing...</em></p>';
    setTimeout(function() {
        typingMessage.innerHTML = '';
    }, 10000)
})