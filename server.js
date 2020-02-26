const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const socketJs = require('./socketJs');


server.listen(80);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {socketJs(socket);});
