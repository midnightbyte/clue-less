const CONSTANTS = require('./constants');
//const PlayerService = require('./playerService');

module.exports = {
  Player: function(name, character) {
    this.name = name;
    let cards;
    this.character = character;
    let currentplayer;
    let id = null;

    this.createPlayer = function (name, character) {
      this.name = name;
      this.character = character;
      this.cards = [];
      this.currentplayer = true;

      switch (character) {
        case 'MissScarlet':
          this.location = 'Hall_Lounge';
          this.id = 0;
          break;
        case 'ColonelMustard' :
          this.location = 'Lounge_DiningRoom';
          this.id = 1;
          break;
        case 'MrsWhite' :
          this.location = 'Ballroom_Kitchen';
          this.id = 2;
          break;
        case 'MrGreen' :
          this.location = 'Conservatory_Ballroom';
          this.id = 3;
          break;
        case 'MrsPeacock' :
          this.location = 'Library_Conservatory';
          this.id = 4;
          break;
        case 'ProfessorPlum' :
          this.location = 'Study_Library';
          this.id = 5;
          break;
      }
    }
    this.createPlayer(this.name, this.character);
  }
}

// class Player {
//   constructor(socket, playerService) {
//     this.socket = socket;
//     this.playerService = playerService;
//     this.gameService = undefined;
//     this.person = undefined;
//   }

//   handleCreateGame() {
//     this.playerService.games[gameService.id] = gameService;
//
//   }
//
//   handleJoinGame(gameId) {
//     // TODO: Validate gameId in playerService.games
//     // TODO: Validate game is not full
//
//     let gameService = playerService.games[gameId];
//     joinGame(gameService);
//     return true;
//   }
//
//   handleCreatePerson(color, name) {
//     // TODO: Validate color in PERSONS
//     // TODO: Validate name not already taken
//
//     //createPerson(color, name);
//   }
//
//   createGame() {
//     let gameService = new GameService(this.playerService);
//     player.joinGame(gameService);
//     return true;
//   }
//
//   joinGame(gameService) {
//     gameService.addPlayer(this);
//     this.gameService = gameService;
//     return true;
//   }
//
//   leaveGame() {
//     gameService.removePlayer(this);
//   }
//
//   createPerson(color, name) {
//     let person = new Person(color, name);
//     this.person = person;
//   }
// }
//
// Player.connect = function(socket, playerService) {
//   let player = new Player(socket, playerService)
//   playerService.players[socket.id] = player
//
//   socket.on('createGame', function(name, color, msg) {
//    // try {
//      // player.createLobby();
//     console.log('create game');
//       player.handleCreatePerson(color, name);
//       socket.emit('createGameResponse', msg);
//       //playerService.io.to(socket.id).emit('createGameResponse', msg);
//     //} catch (error) {
//     //  playerService.io.to(socket.id).emit('createGameResponse', err);
//    // }
//   })
//   socket.on('joinGame', function(data) {
//     try {
//       player.handleJoinGame(data.gameId);
//       playerService.io.to(socket.id).emit('joinGameResponse', true);
//     } catch (error) {
//       playerService.io.sockets(socket.id).emit('joinGameResponse', err);
//     }
//   })
//   socket.on('createPerson', function(data) {
//     try {
//       player.handleCreatePerson(data.name, data.color)
//       playerService.io.to(socket.id).emit('createPersonResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('createPersonResponse', err);
//     }
//   })
//
//   socket.on('startGame', function() {
//     try {
//       gameService.handleStartGame();
//       playerService.io.to(socket.id).emit('startGameResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('startGameResponse', err);
//     }
//   })
//
//
//   socket.on('move', function(data) {
//
//     try {
//       gameService.handleMovePerson(player, data.space);
//       playerService.io.to(socket.id).emit('moveResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('startGameResponse', err);
//     }
//   })
//   socket.on('suggest', function(data) {
//
//     try {
//       gameService.handleSuggestion(player, data.person, data.weapon, data.room);
//       playerService.io.to(socket.id).emit('suggestResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('suggestResponse', err);
//     }
//   })
//   socket.on('accuse', function(data) {
//
//     try {
//       gameService.handleAccusation(player, data.person, data.weapon, data.room);
//       playerService.io.to(socket.id).emit('accuseResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('accuseResponse', err);
//     }
//   })
//   socket.on('endTurn', function() {
//
//     try {
//       gameService.handleEndTurn();
//       playerService.io.to(socket.id).emit('endTurnResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('endTurnResponse', err);
//     }
//   })
//
//   socket.on('respond', function(data) {
//
//     try {
//       gameService.handleCreatePerson(player, data.clue)
//       playerService.io.to(socket.id).emit('respondResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('respondResponse', err);
//     }
//   })
//
//   socket.on('sendMessage', function(data) {
//
//     try {
//       gameService.handleCreatePerson(player, data.to, data.message)
//       playerService.io.to(socket.id).emit('sendMessageResponse', true);
//     } catch (error) {
//       playerService.io.to(socket.id).emit('sendMessageResponse', err);
//     }
//   })
// }
//
// Player.disconnect = function(socket, playerService) {
//   let player = playerService.players[socket.id]
//   if (player.game != undefined) {
//     this.leaveGame(socket);
//   }
//   delete player;
// }

//module.exports = Player;
