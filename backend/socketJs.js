const Player = require('./Player');


function emit(){
    gio.sockets.emit('gameState',game);
}
function emitWon(){
    gio.sockets.emit('gamewon',true);
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

function start(level){
    level != undefined ? game.start(parseInt(level)) : game.start();
    emit(); 
}

function turn(turn){
    game.makeTurn(turn);
    emit();
}

module.exports = function socketJs(socket){
    connection(socket);
    socket.on('sit', (data) => sit(data,socket));
    socket.on('start', (data) => start(data));
    socket.on('turn', (data) => turn(data));
}