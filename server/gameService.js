var GameState = require('./gameState');

class GameService {
  constructor(playerService) {
    this.id = //TODO: SOMETHING
    this.players = []

  }

  addPlayer(player) {
    socket.join(this.id);
    this.players.push(player);
  }

  removePlayer(player) {
    socket.leave(this.id);
    this.players.splice(this.players.indexOf(player), 1);
  }

  startGame() {
    this.gameState = new GameState(this.players);
    main();
  }

  main(){
	  while(gameState.winner==undefined && gameState.active==true){
		currentPlayer = gameState.turnList.shift();
	  	if(currentPlayer.person.hasLost==false){
	  		gameState.turnState = MOVE;
	  		//prompt movement command and handle move
	  		gameState.turnState = SUGGEST;
	  		//prompt for an optional suggestion and handle
	  		gameState.turnState = ACCUSE;
	  		//prompt for an optional accusation and handle
	  	}
	  	gameState.turnList.push(currentPlayer);
	 }
	  
	 if(gameState.winner != undefined){
		 //send message to players announcing winner
		 //end game method?
	 }
  }

  handleMove(player, space) {
    gameState.turnState == MOVE;
    gameState.currentPlayer == player;
    space in gameState.spaces;
    !(space in gameState.persons.map(function(person) {
    	return person.location 
    }))

    if (player.person.location in gameState.rooms) {
      gameState.turnState = SUGGEST
    } else {
      gameState.turnState = ACCUSE
    }

    player.person.move(space)
  }
  
  handleSuggestion(player, person, weapon, room) {
	if (gameState.turnState==SUGGEST && gameState.currentPlayer==player) {
	  if (person in gameState.persons && player.person.location==room && room in gameState.rooms && weapon in gameState.weapons){
		  move(gameState.persons[person], gameState.rooms[room])
		  suggest(player, gameState.persons[person], gameState.weapons[weapon], gameState.rooms[room]);
	  }
	}
  }

  handleSuggestionResponse(player, clue) {

    player.person.seen.push(clue)
    gameState.turnState = ACCUSE
  }

  handleAccusation(player, person, weapon, room) {
	if (gameState.turnState==ACCUSE && gameState.currentPlayer==player) {
		if (person in gameState.persons && room in gameState.rooms && weapon in gameState.weapons){
			accuse(player, gameState.persons[person], gameState.weapons[weapon], gameState.rooms[room]);
		}
	}
  }

  handleEndTurn(player) {
    gameState.turnState = MOVE
  }

  movePerson(person, space) {
	  person.location=space
  }

  suggest(Player, Person, Weapon, Room) {
	  gameState.currentSuggestion = [Person, Weapon, Room];
	  playersToCheck = [];
	  
	  for(i=1;i<gameState.turnList.length;i++){ 
	  	playersToCheck.push(gameState.turnlist[i]);
	  }
	  
	  matchFound=false
	  
	  //loop through players
	  while (playersToCheck.length>0 && matchFound==false){
		 playerToCheck = playersToCheck.shift;
		 
		 //clues matching suggestion are stored in an array
		 matchingClues = [];
		 if(Room in playerToCheck.person.clues){
			 matchingClues.push(Room);
		 }
		 if(Weapon in playerToCheck.person.clues){
			 matchingClues.push(Weapon);
		 }
		 if(Person in playerToCheck.person.clues){
			 matchingClues.push(Person);
		 }
		 
		 if(matchingClues.length>0){
			 matchFound=true;
		 	//Somehow prompt player to pick at most one card to reveal
		 }
	 }
  }

  suggestionResponse(player, clue) {
	  
  }

  accuse(player, person, weapon, room) {
    if (person in gameState.solution && weapon in gameState.solution && room in gameState.solution){
    	gameState.winner = player;
    }
    else{
    	player.person.hasLost = true;
    	if(!(player.person.location in gameState.rooms)){
    		//need to move player to nearest room if they're in a hallway
    	}
    }
  }


}

module.exports = GameService;
