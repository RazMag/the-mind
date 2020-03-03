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
    start(level){
        this.newHands();
        if( level == undefined || level == 0 || level >= 11 ){
            level >= 11 ? level = 11 : level = ++this.level;
            switch(level) { //what level are we on
                case(1) :
                    break;
                case(2) :
                    this.addShur();
                    break;
                case(3) :
                    this.addLive();
                    break;
                case(4) :
                    break;
                case(5) :
                    this.addShur();
                    break;
                case(6) :
                    this.addLive();
                    break;
                case(7) :
                    break;
                case(8) :
                    this.addShur();
                    break;
                case(9) :
                    this.addLive();
                    break;
                case(10) :
                    break;
                case(11) :
                    this.level = 11;
                    return; //dont deal hands
            }
        }
        else{
            this.level = level;
        }
        this.playing = true;
        let cards = [];
        let cardInserted = 0; // how many cards have been inserted into the deck to be dealt
        let num = 0;
        while (cardInserted < this.players.length*this.level){ // generate hands for the amout of players times the current level
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
    makeTurn(turn){
        let currentPlayer = this.players.find(player => player.id == turn[0]);
        currentPlayer.hand = currentPlayer.hand.filter(card => card != turn[1]);
        this.discard.push(turn[1]);
        if( turn[1] != this.lowestCard[1] ){
            this.loseLife();
        }
        this.lowestCard = this.getLowest();
        this.endTurn();
    }
    loseLife(){
        this.lives--;
        if(this.lives<1){
            this.playing = false;
        }
    }
    endTurn(){
        let end = true;
        for ( let i = 0; i <= this.players.length-1; i++ ) {
            if( this.players[i].hand.length > 0 ){
                end = false;
                break;
            }
        }
        if(end){
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
    addShur(){
        if(this.shur < 3){
            this.shur++;
        }
    }
    addLive(){
        if( this.lives < 5){
            this.lives++;
        }
    }
    newHands(){
        if( this.lives == 0 ){
            this.lives = this.players.length;
        }
        this.discard = [];
        this.lowestCard = [ 'uuid', 101 ];
        this.players.forEach(player => {
            player.hand = [];
        });
    }
}