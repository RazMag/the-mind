const uuid = require('uuid/v4');

module.exports = class Player{
    constructor(name){
        this.name = '';
        this.id = uuid();
        this.hand = [];
    }
}