const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
require('dotenv/config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('./config/passport')

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

io.on('connection', (socket) => {
    console.log("Connected!");

    socket.on('disconnect', () => {
        console.log("Disconnected!");
    }) 

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(socket.rooms);
    });

    socket.on('sendMessage', (message) => {
        io.in('test').emit("recieveMessage", message);
    })
})

// Bodyparser
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Passport Middleware
app.use(passport.initialize());

app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));

// Serve Static Assets if were in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
