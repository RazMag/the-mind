const GameState = require('./game');
const app = require('express')(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketJs = require('./socketJs');



global.gio = io; // global server object
let name = '';
process.argv[2] != undefined ? name = process.argv[2] : name = 'test'; //parse game name from the command line
global.game = new GameState(name); // this game's object
console.log(game);

server.listen(80); //simple server for testing 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

gio.on('connection', (socket) => socketJs(socket)); //socket handler