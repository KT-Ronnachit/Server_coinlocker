var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var cors = require('cors')

var locker = require('./src/route/locker')
var version = '/api/v1/'
var port = process.env.PORT || 3013;

var corsOptions = {
    origin: (origin, cb) => {
        console.log(origin);
        cb(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(version + 'locker', locker)

io.on('connection', function (socket) {
    console.log('Conexted');
    socket.on('disicnnect', function () {
        console.log('Disconnect');
    })
    socket.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})

http.listen(port, function () {
    console.log('running in port http://localhost:' + port)
})