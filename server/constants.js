const PERSONS = {
  "scarlet": {
    "name": "Miss Scarlet",
    "location": "hall_lounge"
  },
  "plum": {
    "name": "Proffesor Plum",
    "location": "study_library"
  },
  "mustard": {
    "name": "Colonel Mustard",
    "location": "lounge_dining_room"
  },
  "peacock": {
    "name": "Mrs. Peacock",
    "location": "library_conservatory"
  },
  "green": {
    "name": "Mr. Green",
    "location": "conservatory_ballroom"
  },
  "white": {
    "name": "Mrs. White",
    "location": "ballroom_kitchen"
  }
}
const WEAPONS = [
  "candlestick",
  "knife",
  "rope",
  "revolver",
  "lead_pipe",
  "wrench"
]
const ROOMS = {
  "study": {
    "paths": ["study_hall", "study_library", "kitchen"]
  },
  "hall": {
    "paths": ["study_hall", "hall_lounge", "hall_billiard_room"]
  },
  "lounge": {
    "paths": ["lounge_dining_room", "hall_lounge", "conservatory"]
  },
  "library": {
    "paths": ["library_conservatory", "library_conservatory", "library_billiard_room"]
  },
  "billiard_room": {
    "paths": ["billiard_room_ballroom", "billiard_room_dining_room", "hall_billiard_room", "library_billiard_room"]
  },
  "dining_room": {
    "paths": ["dining_room_kitchen", "lounge_dining_room", "billiard_room_dining_room"]
  },
  "conservatory": {
    "paths": ["conservatory_ballroom", "library_conservatory", "lounge"]
  },
  "ballroom": {
    "paths": ["ballroom_kitchen", "conservatory_ballroom", "billiard_room_ballroom"]
  },
  "kitchen": {
    "paths": ["ballroom_kitchen", "dining_room_kitchen", "study"]
  }
}
const HALLWAYS = {
  "study_hall": {
    "paths": ["study", "hall"]
  },
  "hall_lounge": {
    "paths": ["hall", "lounge"]
  },
  "library_billiard_room": {
    "paths": ["library", "billiard_room"]
  },
  "billiard_room_dining_room": {
    "paths": ["billiard_room", "dining_room"]
  },
  "conservatory_ballroom": {
    "paths": ["conservatory", "ballroom"]
  },
  "ballroom_kitchen": {
    "paths": ["ballroom", "kitchen"]
  },
  "study_library": {
    "paths": ["study", "library"]
  },
  "library_conservatory": {
    "paths": ["library", "conservatory"]
  },
  "hall_billiard_room": {
    "paths": ["hall", "billiard_room"]
  },
  "billiard_room_ballroom": {
    "paths": ["billiard_room", "ballroom"]
  },
  "lounge_dining_room": {
    "paths": ["lounge", "dining_room"]
  },
  "dining_room_kitchen": {
    "paths": ["dining_room", "kitchen"]
  }
}

const MOVE = "move"
const SUGGEST = "suggest"
const AWAIT_RESPONSE = "await_response"
const RESPOND = "respond"
const ACCUSE_OR_END = "accuse_or_end"
const MESSAGE = "message"
const GAME_STATE = "game_state"
