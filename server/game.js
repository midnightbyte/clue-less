PLAYERS = {};
exports = module.exports = function(io){
  console.log('server start')
  io.sockets.on('connection', function(socket) {

    console.log('connect ' + socket.id)
    PLAYERS[socket.id] = socket;

    socket.on('createLobby', function() {
      console.log('new game');
      // NOTE: Used to create lobby
    });
    socket.on('joinLobby', function() {
      console.log('join game');
      // NOTE: Used to join lobby, will need server side verification that the lobby exists
    });

    socket.on('addPlayer', function(data) {
      console.log('addPlayer ' + socket.id)
      // NOTE: Used to add player to lobby, will need server side verification
      // to verify that a players username is unique and person selected is unique
      // Will eventually need data.username and data.person
    });
    socket.on('removePlayer', function(data) {
      console.log('removePlayer ' + socket.id)
      // NOTE: Used to remove player from lobby (abandon joining lobby)
    });

    socket.on('disconnect', function() {
      console.log('disconnect');
      delete PLAYERS[socket.id]
    });
  });
}

setInterval(function() {
  console.log('\nCurrently connected:');
  for (var s in PLAYERS) {
    console.log(s);
  }
}, 2500)
