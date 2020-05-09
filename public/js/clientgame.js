
let selectedChar;
let socketID;

$(document).ready(function(){
    let socket = io.connect('http://localhost:1234');

    socket.on('connected', function(data) {
        clearGameMessage();
        displayGameMessage('waiting for players ...')
        socket.emit('initialize');
    });

    // handle player join
    socket.on('playerJoined', function(msg){

        displayGameMessage(msg);
    });

    socket.on('playerDisconnected', function(data){
      //  $("#messages").load(window.location.href + " #messages" );
        displayGameMessage('player has left');
    });

    socket.on('availableCharacters', function(data) {
        setCharacterList(data.charList);
    });

    // handle login dialog submit
    $('#playerLogin').submit(function(e){
        e.preventDefault();
        let pname = $('#playername').val();
        let pcharacter = selectedChar;
        let charInfo = { playername: pname, playercharacter: pcharacter};
     //   let msg = pname + " has joined as " + pcharacter;
        socket.emit('selectedCharacter', charInfo);
        $('#loginDialog .close').click();
    });

    socket.on('createGameResponse', (msg) => {
        console.log(msg);
        $('#playerslist').append("<p>" + msg + "</p>")
    });

    socket.on('message', function(message) {
        alert('server message: ' + message);
    });
});
