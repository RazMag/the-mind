const Player = require('./player');
// const Promise = require('promise');


function getRndInteger( min, max ){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function getMinimum( array ){
    return Math.min.apply( Math, array );
};

module.exports = class GameState{
    constructor(name){
        this.name = name;
        this.level = 0;
        this.playing = false;
        this.lives = 0;
        this.shur = 1;
        this.discard = [];
        this.players = [];
        this.spectators = [];
        this.lowestCard = [ 'uuid', 101 ];
    }
    newPlayer(player){
        this.players.push(player);
        console.log(this.players);
    }
    start(){ // TODO add fuctionaliti for starting specific levels
        this.playing = true;
        let cards = [];
        let cardInserted = 0; // how many cards have been inserted into the deck to be dealt
        let num = 0;
        switch(this.level) {
            case(0) :
                this.level = 1;
                this.lives = this.players.length;
                break;
            case(2) :
                this.shur++;
                break;
        }
        while (cardInserted < this.players.length*this.level){
            num = getRndInteger(1,100);
            if( !(cards.includes(num)) ){ // check if card was already drawn
                cards.push(num);
                cardInserted++;
            }
        }
        while(cards.length != 0){
            this.players.forEach(player => {
                player.hand.push(cards.pop());
            });
        }
        this.lowestCard = this.getLowest();
    }
    loseLife(){
        this.lives--;
        if(this.lives<1){
            this.playing = false;
        }
    }
    endTurn(){
        let end = true;
        for ( let i = 0; i < this.players.length-1; i++ ) {
            if( this.players[i].length > 0 ){
                end = false;
                break;
            }
            
        }
        if(end){
            this.level++;
            this.start();
        }
    }
    getLowest(){
        let lowestCard = ['uuid',101];
        let playerLowest = 0;
        this.players.forEach(player => {  // get everybody's lowest cards
            playerLowest = getMinimum(player.hand);
            if(playerLowest < lowestCard[1]){
                lowestCard[0] = player.id;
                lowestCard[1] = playerLowest;
            }
        });
        return lowestCard;
    }
    makeTurn(turn){
        let currentPlayer = this.players.find(player => player.id == turn[0]);
        currentPlayer.hand = currentPlayer.hand.filter(card => card != turn[1]);
        this.discard.push(turn[1]);
        if( turn[1] != this.lowestCard[1] ){
            this.loseLife();
        }
        this.lowestCard = this.getLowest();
    }
}