const uuid = require('uuid/v4');

module.exports = class Player{
    constructor(){
        this.id = uuid()
    }
}