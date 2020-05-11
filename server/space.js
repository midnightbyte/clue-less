module.exports = {
  Space: function(name, isRoom, whoHere) {
    this.name = name;       // space name
    this.isRoom = isRoom;   // if not a room, it's a hallway
    this.whoHere = whoHere; // who is on this space
    this.nextSpaces = [];   // list of next door spaces
  }
};
