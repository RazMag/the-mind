const { v4: uuidv4 } = require('uuid');

module.exports = class Player{
    constructor(name,socketID){
        this.name = name;
        this.id = uuidv4();
        this.hand = [];
        this.socketId = socketID;
        this.connected = true;
    }
}