const defaultValues = require('./constants');

class Player {
  constructor(playername, character) {
    this.playername = playername;
    let id;
    let location;
    let key;
    let data = JSON.parse(defaultValues);


    switch(character) {
      case "MissScarlet": key = 'scarlet'; break;
      case "ProfessorPlum": key = 'plum'; break;
      case "ColonelMustard": key = 'mustard'; break;
      case "MrsPeacock": key = 'peacock'; break;
      case "MrGreen": key = 'green'; break;
      case "MrsWhite": key = 'white'; break;
    }

    for (let j in data) {
      if (j === key) {
        for (let x in data[key]) {
          this.id = data[key][id];
          this.location = data[key][location];
          this.character = data[key][name];
        }
      }
    }

  }
}

