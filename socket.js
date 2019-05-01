var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

const server = app
const port = 3013;

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}))

io.on('connection', function (socket) {
    console.log('Conexted');

    socket.on('disicnnect', function () {
        console.log('Disconnect');
    })

    socket.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
        console.log(message);

    })
})



http.listen(port, function () {
    console.log('running in port http://localhost:' + port)

})