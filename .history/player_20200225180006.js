const uuid = require('uuid/v4');

module.exports = class Player{
    constructor(){
        this.name = '';
        this.id = uuid();
        this.hand = [];
    }
}