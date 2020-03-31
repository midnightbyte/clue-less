class GameState {
  constructor(players) {
	  this.playersList = players;
  }

  this.playersList = [];
  this.turnQueue = [];
  this.turnPhases = [];
  
  checkActivePlayer(){
	  return this.turnQueue[0];
  }
  
  checkTurnPhase(){
	  return this.turnPhases[0];
  }
  
  shiftTurnPhase(){
	  this.turnPhases.push(this.turnPhases.shift());
  }
  
  changeActivePlayer(){
	  this.turnQueue.push(this.turnQueue.shift());
  }
  
  update() {

  }
}

module.exports = GameState;
