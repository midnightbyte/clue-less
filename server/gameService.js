var GameState = require('./gameState');
let Message = require('./message');
let CONSTANTS = require('./constants');
import { v4 as uuidv4 } from 'uuid';

class GameService {
  constructor(playerService) {
    this.id = uuidv4();
    this.players = []
    this.io = io;
  }

  addPlayer(player) {
    socket.join(this.id);
    this.players.push(player);
  }

  removePlayer(player) {
    socket.leave(this.id);
    this.players.splice(this.players.indexOf(player), 1);
  }

  handleStartGame() {
    // TODO: Validate all players have a person
    // TODO: Validate this.players > 1;
    
    this.gameState = new GameState(this.players);
    let currentPlayer = this.gameState.currentPlayer
    this.io.to(currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
    
    // XXX: MESSAGE
    let startGameMessage=ServerMessage("The game has started.");
    sendMessage(startGameMessage);
  }

  endGame() {
    // XXX: MESSAGE
	let endGameMessage=ServerMessage("The game has ended.");
	sendMessage(endGameMessage);
  }

  handleMovePerson(player, space) {
    // TODO: Validate this.gameState.turnStatus == MOVE;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate space in this.gameState.spaces;
    // TODO: Validate space in player.person.location.paths;

    movePerson(player.person, this.gameState.spaces[space])
  }

  handleSuggestion(player, person, weapon, room) {
    // TODO: Validate this.gameState.turnStatus == SUGGEST;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate person in this.gameState.persons;
    // TODO: Validate weapon in this.gameState.weapons;
    // TODO: Validate room in this.gameState.rooms;
    // TODO: Validate player.person.location in this.gameState.rooms[room]

		move(this.gameState.persons[person], this.gameState.rooms[room])
    move(this.gameState.weapons[weapon], this.gameState.rooms[room])
		suggest(player, this.gameState.persons[person], this.gameState.weapons[weapon], this.gameState.rooms[room]);
  }

  handleSuggestionResponse(player, clue) {
    // TODO: Validate this.gameState.turnStatus == SUGGEST_RESPONSE;
    // TODO: Validate this.gameState.responsePlayer == player;
    // TODO: Validate clue in this.gameState.clues;

    suggestionResponse(player, this.gameState.clues[clue]);
  }

  handleAccusation(player, person, weapon, room) {
    // TODO: Validate this.gameState.turnStatus == ACCUSE_END;
    // TODO: Validate this.gameState.currentPlayer == player;
    // TODO: Validate person in this.gameState.persons;
    // TODO: Validate weapon in this.gameState.weapons;
    // TODO: Validate room in this.gameState.rooms;

  	accuse(player, this.gameState.persons[person], this.gameState.weapons[weapon], this.gameState.rooms[room]);
  }

  handleEndTurn(player) {
    // TODO: Validate this.gameState.turnStatus == ACCUSE_END;
    // TODO: Validate this.gameState.currentPlayer == player;

    endTurn(player);
  }

  moveClue(clue, space) {
	  clue.location = space;
	  
	// XXX: MESSAGE
	 let clueMoveMessage = ServerMessage(clue + " has moved to the " + space + ".");
	 sendMessage(clueMoveMessage);
  }

  movePlayer(player, space) {
	  player.person.location = space;
    if (player.person.location in this.gameState.rooms) {
      this.gameState.turnStatus = SUGGEST;
      this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    } else {
      this.gameState.turnStatus = ACCUSE_OR_END;
      this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    }
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
    
    // XXX: MESSAGE
	let playerMoveMessage = ServerMessage(player + " has moved to the " + space + ".");
	sendMessage(playerMoveMessage);
  }

  suggest(player, person, weapon, room) {
	// XXX: MESSAGE
	let suggestMessage = ServerMessage(player + "(" + player.person + ") has suggested " + person + " in the " + room + "with the " + weapon + ".");
	sendMessage(suggestMessage);
	
	this.gameState.currentSuggestion = [person, weapon, room];

    for (otherPlayer in this.gameState.turnList) {
      for (clue in this.gameState.currentSuggestion) {
        if(otherPlayer.person.clues.includes(clue)) {
          this.gameState.currentSuggestionResponder = otherPlayer;
          this.gameState.turnStatus = AWAIT_RESPONSE;
          this.io.to(player.socket.id).emit(this.gameState.turnStatus);
          this.io.to(this.gameState.currentSuggestionResponder.socket.id).emit(RESPOND, this.currentSuggestion);
          this.io.to(this.id).emit(GAME_STATE, this.gameState);
          
          // XXX: MESSAGE
          let revealMessage = ServerMessage(otherPlayer + "("  + otherPlayer.person + ") revealed a clue to " + this.gameState.currentPlayer + ".");
          sendMessage(revealMessage);
          
          return;
        }
        
        let noMatchMessage = ServerMessage(otherPlayer + " did not reveal a clue.");
        sendMessage(noMatchMessage);
      }
    }
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(player.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
    
    // XXX: MESSAGE
    let endSuggestionMessage = ServerMessage(player + "'s (" + player.person + ") suggestion has ended.");
    sendMessage(endSuggestionMessage);
  }

  suggestionResponse(player, clue) {
    this.gameState.currentSuggestion = undefined;
    this.gameState.currentSuggestionResponse = undefined;
    this.gameState.currentSuggestionResponder = undefined;

    this.gameState.currentPlayer.person.seen.push(clue);
    this.gameState.turnStatus = ACCUSE_OR_END;
    this.io.to(this.gameState.currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
    
    // XXX: MESSAGE
    let revealMessage = ServerMessage(this.gameState.currentPlayer, player + " revealed their " + clue + " clue.");
    sendMessage(revealMessage);
  }

  accuse(player, person, weapon, room) {
	// XXX: MESSAGE
    let accuseMessage = ServerMessage(player + "(" + player.person + ") has accused " + person + " in the " + room + "with the " + weapon + ".");
    sendMessage(accuseMessage);

    if (person in this.gameState.solution && weapon in this.gameState.solution && room in this.gameState.solution) {
    	// XXX: MESSAGE
      let winnerMessage = ServerMessage(player + "(" + player.person + ") has won!");
      sendMessage(winnerMessage);
      
      this.gameState.winner = player;
      this.io.to(this.id).emit(GAME_STATE, this.gameState);
      endGame();
    }
    else {
      // XXX: MESSAGE
      let loserMessage = ServerMessage(player + "(" + player.person + ") has lost.");
      sendMessage(loserMessage);
      
      // TODO: DELETE PLAYER FROM GAME
      
      endTurn();
    }
  }

  endTurn(player) {
	// XXX: MESSAGE
    let endTurnMessage = ServerMessage(player + "(" + player.person + ") has ended their turn.");
    sendMessage(endTurnMessage);
    
    this.gameState.nextCurrentPlayer()
    this.gameState.turnStatus = MOVE
    this.io.to(this.gameState.currentPlayer.socket.id).emit(this.gameState.turnStatus);
    this.io.to(this.id).emit(GAME_STATE, this.gameState);
  }

  handleSendMessage(player, to, message) {
    // TODO: Validate to in this.players;

    let message = PlayerMessage(player, to, message);
    sendMessage(message);
  }

  sendMessage(message) {
    if(message.to) {
      this.io.to(message.to.socket.id).emit(MESSAGE, message);
    } else {
      this.io.to(this.id).emit(MESSAGE, message);
    }
  }
}

module.exports = GameService;
