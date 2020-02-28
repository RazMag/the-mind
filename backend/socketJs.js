const Player = require('./Player');

function connection(socket){
    console.log(`connected with id = ${socket.id}`)
    socket.emit('gameState',game); // recieve current game at connection
}

function join(name,socket){
    let player = new Player(name,socket.id); // add test if player is sat already (by socket id)?
    game.newPlayer( player );
    gio.sockets.emit( 'gameState',game );
    socket.emit( 'uuid',player.id ) // return this players uuid
}

function start(){
    game.start();
    gio.sockets.emit('gameState',game); 
}

module.exports = function socketJs(socket){
    connection(socket);
    socket.on('join', (data) => join(data,socket));
    socket.on('start', () => start());
    socket.on('turn', (data) => turn(data));
}