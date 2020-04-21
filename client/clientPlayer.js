class ClientPlayer {

    constructor(playername, character) {
    this.playername = playername;
    this.character = character;

    switch (character) {
        case 'MissScarlet': this.location = 'hall_lounge'; break;
        case 'ColonelMustard' : this.location = 'lounge_dining_room'; break;
        case 'MrsWhite' : this.location = 'ballroom_kitchen'; break;
        case 'MrGreen' : this.location = 'conservatory_ballroom'; break;
        case 'MrsPeacock' : this.location = 'library_conservatory'; break;
        case 'ProfessorPlum' : this.location = 'study_library'; break;
    }
}}

module.exports = ClientPlayer;
