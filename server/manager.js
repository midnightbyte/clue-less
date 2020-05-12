
let player = require('./player.js');
let gamestate = require('./gameState.js');
let character = require('./character');
const Character = require("./character").Character;
const Player = require('./player').Player;

let currentGame = null;
let io;
let socket;
let suggestion = {};

exports.initialize = function(io, socket) {
    this.io = io;
    this.socket = socket;
    console.log('socket ID ' + socket.id);
    io.sockets.emit('connected', {id: socket.id});

    socket.on('initialize', function(data) {
        io.sockets.emit('playerJoined', 'player has joined');
        initialize(io);
    });

    socket.on('selectedCharacter', function(data) {
        console.log('selected character ' + data.playercharacter);
       // selectCharacter(io, socket, data);
        selectCharacter(io, socket, data);
    });

    socket.on('startgame', function(data) {
       // startGame(io, socket, data);
        startGame(io, socket, data);
    })
}

function initialize(io) {
     let gameID;
     if (currentGame === null) {
         gameID = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
         currentGame = new gamestate.GameState(gameID);
         console.log('new game ' + currentGame.gameID);
     }
    // put gameid in socket
    //io.sockets.gameID = gameID;

    if (currentGame.initialized === false) {
        io.sockets.emit('availableCharacters', {charList: currentGame.characters});
    } else {
        io.sockets.emit('showGame', {
            game: currentGame,
            currentPlayerLocation: currentGame.currentPlayer,
            currentLocation: currentGame.currentPlayerLocation(),
            moves: []});
     }

}

function selectCharacter(io, socket, data) {
    let pname = data.playername;
    let pchar = data.playercharacter;
    socket.player = new Player(pname, pchar);

    for (let i=0; i<currentGame.characters.length; i++) {
        let charname = currentGame.characters[i].name;
        let selcharname = pchar;

        if (charname === selcharname) {
            currentGame.characters.splice(i,1);
            // need a check if no characters left
        }
    }

    currentGame.players.push(socket.player);

    io.sockets.emit('selectedCharacters', {charList: currentGame.characters, game: currentGame});

}

function startGame(io, socket, data) {
    console.log('game started by ' + socket.id);
    if (currentGame.initialized === false) {
        currentGame.createGame();
    }

    io.sockets.emit('showGame', {
        msg: 'Game Started!', game: currentGame,
        firstPlayer: currentGame.currentPlayer});
}

