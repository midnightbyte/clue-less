let io;
let socket;
let player = require('./player.js');
let gamestate = require('./gameState.js');
let activeGame = null;



exports.initialize = function(io, socket) {
    this.io = io;
    this.socket = socket;
    console.log('socket ID ' + this.socket.id);
    this.io.sockets.emit('connected', {id: socket.id});

    socket.on('initialize', function(data) {
        io.sockets.emit('playerJoined', 'player has joined');
        startGame(socket);
    });

    socket.on('selectedCharacter', function(data) {
        console.log('selected character ' + data.playercharacter);
        selectCharacter(socket, data);
    })
}

function startGame(s) {
    let gameID;
    if (activeGame === null) {
        gameID = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        activeGame = new gamestate(gameID);
        console.log('new game ' + activeGame.gameID);
    }
    // put gameid in socket
    s.join(gameID);

    if (activeGame.initialized === false) {
        s.emit('availableCharacters', {charList: activeGame.characters});
    } else {
        s.emit('displayGameBoard');
    }

}

function selectCharacter(s, data) {
    let pname = data.playername;
    let pchar = data.playercharacter;
    console.log(pchar);
    let newplayer = new player(pname, s.id, pchar);
    console.log(pchar);
    activeGame.characters.splice(pchar, 1);  // need a check if no characters left
    activeGame.players.push(newplayer);

    s.emit('availableCharacters', {charList: activeGame.characters});



}
