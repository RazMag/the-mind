const uuid = require('uuid/v4'); //TODO change to new import (if possible)

module.exports = class Player{
    constructor(name){
        this.name = name;
        this.id = uuid();
        this.hand = [];
    }
}