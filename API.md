
# API v0.0.1

- [API v0.0.1](#api-v001)
  - [Socket.io events](#socketio-events)
  - [Joining](#joining)
  - [Sitting down](#sitting-down)
  - [Starting a game / Starting a new level](#starting-a-game--starting-a-new-level)
  - [Making a turn](#making-a-turn)
  - [Winning](#winning)
  - [**gameState object**](#gamestate-object)
    - [gameState Elements from top to bottom](#gamestate-elements-from-top-to-bottom)
  - [**Player object**](#player-object)
    - [Player Elements from top to bottom](#player-elements-from-top-to-bottom)

## Socket.io events

the-mind's back end is built using socket.io sockets.
these sockets send events in a Array form, where the first element in the array (position 0) is the events's name and the second is the data.
Note: socket.io enables longer arrays but for the purpose of the mind only 2 long arrays are used.

All events will cause the server to broadcast the new gamestate.

Events are read with `socket.on()`

Example:

    socket.on('eventName', (data) => { //code block}

## Joining

A player is considered joined when a socket connection is established with the server.
When a player initiats a socket with the server he recieves the entire `gameState` as a socket event named "gameState" with the [gameState object](#gamestate-event) as the data.

Example:

    var socket = io.connect('http://localhost');

This line will join a server hosted at localhost.

## Sitting down

A player that is sat down is included in the players array in the current [gameState object](#gamestate-event).
In order for a player to sit down he need to initiate a `sit` event.
A `sit` event's data is this player's chosen name.

Example:

    socket.emit('sit',"name");

Note: the sit event will cause the server to send the new player a `uuid` event with this players uuid.

Example of the `uuid` event:

    ["uuid", "83f88097-dfa2-4375-9d4b-39d42a60c4a9"]

## Starting a game / Starting a new level

The start event will cause the server to start a new level and deal new hands.
if the event value is set to `null` then the next level will start.
It it also possible to send an int as the data of the event and start that specific level.

Example:

    socket.emit('start',5);

## Making a turn

To play a card the player needs to initiate the `turn` event.
Thew turn event's data is an array with the player's uuid and the card that was played.

Example:

    socket.emit('turn',["83f88097-dfa2-4375-9d4b-39d42a60c4a9", 55])

## Winning

When level 10 is over the [gameState object](#gamestate-event) level is set to 11 and all the players' hands are empty.

## **gameState object**

    {
        "name":"gameName",
        "level":1,
        "playing":true,
        "lives":1,
        "shur":1,
        "discard":[74],
        "players":[
        {
            "name":"playerName",
            "id":"2b6cfc35-3b14-4b66-a444-e81ea70edd5a",
            "hand":[82,78],
            "socketId":"wjKOOGvIkfRONIFAAAAC"},
        ],
        "spectators":[],
        "lowestCard":["83f88097-dfa2-4375-9d4b-39d42a60c4a9",49]
    }

### gameState Elements from top to bottom

- **name** - ( type: string ) Current game name.
- **level** - ( type: int ) Current level that is being played. Note: this is set to 0 until level 1 starts, then is set to 1 and so forth.
- **playing** - ( type: bool ) state of the game. set to false before game starts and between levels.
- **lives** - ( type: int ) Number of lives left. 5 at most 0 when game is lost
- **shur** - ( type: int ) Number of shurikens left. 3 at most.
- **discard** ( type: Array[int] ) array of discarded cards, from first to last.
- **players** - ( type: Player ) - array of players in the game. See [Player object](#player-object).
- **spectators** - ( type: Player ) - array of spectators watching the game.
- **lowestCard** - ( type: array[uuid(string),int] ) - the uuid of the player with the lowest card and the cards value. This is the correct next turn.

## **Player object**

    {
        name:"playerName",
        id:"2b6cfc35-3b14-4b66-a444-e81ea70edd5a",
        "hand":[82,78],
        "socketId":"wjKOOGvIkfRONIFAAAAC" <!--TODO add connected--!>
    }

### Player Elements from top to bottom

- **name** - ( type: string ) This players name.
- **id** - ( type: string ) This players randomly genarated id in UUID format.
- **hand** - ( type: Array[int] ) - cards this player has.
- **socketId** - ( type: string ) - the socket.io id that was used to create this player. Note: this was a testing tool, will probably be removed.
