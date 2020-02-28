// const server = require('./server');
const GameState = require('./game');
const app = require('express')(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketJs = require('./socketJs');
const Player = require('./Player');


global.gio = io;
global.game = new GameState('test'); // this game's object
console.log(game);

server.listen(80); //simple server for testing 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

gio.on('connection', (socket) => socketJs(socket)); //socket handler