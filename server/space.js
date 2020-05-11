module.exports = {
  Space: function(name, isRoom, whoHere, imageFile) {
    this.name = name;       // space name
    this.isRoom = isRoom;   // if not a room, it's a hallway
    this.whoHere = whoHere; // who is on this space
    this.nextSpaces = [];   // list of next door spaces
    this.imageFile = imageFile;  // image card for this space
  }
};
