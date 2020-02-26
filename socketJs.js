

function connection(socket){
    console.log(`connected with id = ${socket.id}`)
}

module.exports = function socketJs(socket){
    connection(socket);
    // console.log(`henlo socket`);
}