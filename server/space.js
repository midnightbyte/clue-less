module.exports = {
  Space: function(name, isRoom, characters) {
    this.name = name;
    this.isRoom = isRoom;
    this.characters = characters;
    this.nextSpaces = [];
  }
};
