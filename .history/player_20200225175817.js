import { v4 as uuidv4 } from 'uuid';

module.exports = class Player{
    constructor(){
        this.id = uuid();
    }
}