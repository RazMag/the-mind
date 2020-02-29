const Player = require('./Player');


function emit(){
    gio.sockets.emit('gameState',game);
}

function connection(socket){
    console.log(`connected with id = ${socket.id}`)
    socket.emit('gameState',game); // recieve current game at connection
}

function sit(name,socket){
    let player = new Player(name,socket.id); // add test if player is sat already (by socket id)?
    game.newPlayer( player );
    emit();
    socket.emit( 'uuid',player.id ) // return this players uuid
}

function start(){
    game.start(0);
    emit(); 
}

function turn(turn){
    game.makeTurn(turn);
    emit();
}

module.exports = function socketJs(socket){
    connection(socket);
    socket.on('sit', (data) => sit(data,socket));
    socket.on('start', () => start());
    socket.on('turn', (data) => turn(data));
}