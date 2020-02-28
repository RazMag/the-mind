const Player = require('./player');


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = class GameState{
    constructor(name){
        this.name = name;
        this.level = 1;
        this.playing = false;
        this.lives = 0;
        this.shur = 1;
        this.discard = [];
        this.players = [];
        this.spectators = [];
    }
    newPlayer(player){
        this.players.push(player);
        console.log(this.players);
    }
    start(){
        this.playing = true;
        let cards = [];
        let cardInserted = false;
        let num = 0;
        switch(this.level) {
            case(1) :
                this.lives = this.players.length;
                for(var i=0; i < this.players.length ; i++){  //run for the amount of people in the room
                    while (!cardInserted){
                        num = getRndInteger(1,100);
                        if( !(cards.includes(num)) ){
                            cards.push(num);
                            cardInserted = true;
                        }
                    }
                    cardInserted = false;
                }
                break;
        }
        while(cards.length != 0){
            this.players.forEach(player => {
                player.hand.push(cards.pop());
            });
        }
    }
}