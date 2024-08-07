const express=require('express')
const http=require('http')
const socket=require('socket.io')
const mysql=require('mysql2')

const app=express();
const server=http.createServer(app);
const io=socket(server)

const db=require('../config/database');


db.connect((err)=>{
    if(err){
        console.error('db not connected',err.stack)
        return;
    }
    else{
        console.log('db connected sucessfully')
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('optionSelected', (option) => {
        if (option === 'getProducts') {
            fetchProducts((products) => {
                socket.emit('botResponse', products);
            });
        } else {
            socket.emit('botResponse', 'Unknown option selected.');
        }
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

function fetchProducts(callback) {
    const query = 'SELECT * FROM products';
    db.query(query, (error, results) => {
        if (error) throw error;
        callback(results);
    });
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

