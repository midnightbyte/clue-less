
let player = require('./player.js');
let gamestate = require('./gameState.js');
let character = require('./character');
const Character = require("./character").Character;
const Player = require('./player').Player;
let currentGame = null;
let io;
let gsocket;

exports.initialize = function(gio, socket) {
    io = gio;
    gsocket = socket;
    console.log('socket ID ' + gsocket.id);
    gsocket.emit('connected', {id: socket.id});

    gsocket.on('initialize', initialize);
    gsocket.on('selectedCharacter', selectCharacter);

    // gsocket.on('initialize', function(data) {
    //     io.sockets.emit('playerJoined', 'player has joined');
    //     initialize();
    // });

    // gsocket.on('selectedCharacter', function(data) {
    //     console.log('selected character ' + data.playercharacter);
    //    // selectCharacter(io, socket, data);
    //     selectCharacter(data);
    // });

    gsocket.on('startgame', function(data) {
       // startGame(io, socket, data);
        startGame(data);
    })
}

function initialize(data) {
    io.sockets.emit('playerJoined', 'player has joined');

    let gameID;
    if (currentGame === null) {
        gameID = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        currentGame = new gamestate.GameState(gameID);
        console.log('new game ' + currentGame.gameID);
    }
    // put gameid in socket
    this.join(this.gameID);
   // io.sockets.gameID = gameID;

    if (currentGame.initialized === false) {
        this.emit('availableCharacters', {charList: currentGame.characters});
    } else {
        this.emit('showGame', {
            game: currentGame,
            currentPlayerLocation: currentGame.currentPlayer,
            currentLocation: currentGame.currentPlayerLocation(),
            moves: []});
    }
}

function selectCharacter(data) {
    let pname = data.playername;
    let pchar = data.playercharacter;
    let newplayer = new player.Player(pname, gsocket.id, pchar);

    for (let i=0; i<currentGame.characters.length; i++) {
        let charname = currentGame.characters[i].name;
        let selcharname = pchar;

        if (charname === selcharname) {
            currentGame.characters.splice(i,1);
            // need a check if no characters left
        }
    }

    currentGame.players.push(newplayer);

    io.sockets.emit('selectedCharacters', {charList: currentGame.characters, game: currentGame});

}

function startGame(data) {
    console.log('game started by ' + gsocket.id);
    if (currentGame.initialized === false) {
        currentGame.createGame();
    }

    let currentLocation = currentGame.currentPlayerLocation();
    let moves = currentGame.getMoves();
    console.log('moves' + moves);
    let msg = 'Game started.';

    io.sockets.emit('showGame', {
        msg: msg, game: currentGame,
        currentPlayer: currentGame.currentPlayer,
        currentLocation: currentLocation, moves: moves});
}

