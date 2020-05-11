let io;
let socket;
let player = require('./player.js');
let gamestate = require('./gameState.js');
let character = require('./character');
const Character = require("./character").Character;
const Player = require('./player').Player;
let activeGame = null;



exports.initialize = function(io, socket) {
    this.io = io;
    this.socket = socket;
    console.log('socket ID ' + this.socket.id);
    this.io.sockets.emit('connected', {id: socket.id});

    socket.on('initialize', function(data) {
        io.sockets.emit('playerJoined', 'player has joined');
        initialize(io);
    });

    socket.on('selectedCharacter', function(data) {
        console.log('selected character ' + data.playercharacter);
        selectCharacter(io, socket, data);
    });

    socket.on('startgame', function(data) {
        startGame(io, socket, data);
    })
}

function initialize(io) {
    let gameID;
    if (activeGame === null) {
        gameID = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        activeGame = new gamestate.GameState(gameID);
        console.log('new game ' + activeGame.gameID);
    }
    // put gameid in socket
    io.sockets.gameID = gameID;

    if (activeGame.initialized === false) {
        io.sockets.emit('availableCharacters', {charList: activeGame.characters});
    } else {
        io.sockets.emit('displayGameBoard');
    }

}

function selectCharacter(io, socket, data) {
    let pname = data.playername;
    let pchar = data.playercharacter;
    let newplayer = new player.Player(pname, socket.id, pchar);

    for (let i=0; i<activeGame.characters.length; i++) {
        let charname = activeGame.characters[i].name;
        let selcharname = pchar;

        if (charname === selcharname) {
            activeGame.characters.splice(i,1);
            // need a check if no characters left
        }
    }

    activeGame.players.push(newplayer);

    io.sockets.emit('selectedCharacters', {charList: activeGame.characters, game: activeGame});

}

function startGame(io, socket, data) {
    console.log('game started by ' + socket.id);
    if (activeGame.initialized === false) {
        activeGame.createGame();
    }
}

