const express = require('express');
const app = express()
const path = require('path');
const { Socket } = require('socket.io');
const PORT = process.env.port || 4000;
const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')))
let socketsConnected = new Set();
const socket = io();

socket.on('botResponse', (response) => {
    const messages = document.getElementById('messages');
    if (Array.isArray(response)) {
        // Handle product list response
        response.forEach(product => {
            messages.innerHTML += `<p>Product: ${product.name} - Price: ${product.price}</p>`;
        });
    } else {
        messages.innerHTML += `<p>${response}</p>`;
    }
});

function sendOption() {
    const select = document.getElementById('options');
    const option = select.value;
    socket.emit('optionSelected', option);
}