
let playerData;
let selectedChar;

$(document).ready(function(){
    let socket = io.connect('http://localhost:1234');
    socket.on('connect', function(data) {
        socket.emit('joined', 'player has joined');
    });

    // handle create lobby click
    $('.createLobby').click(function() {
        socket.emit('createLobby');
    });

    // handle join lobby click
    $('.joinLobby').click(function() {
        let lobbyId = $('.lobby').val();
        console.log(lobbyId);
        socket.emit('joinLobby', {
            lobbyId: lobbyId
        });
    });

    // handle player join
    socket.on('playerJoined', function(msg){
        displayGameMessage(msg);
    });

    // handle login dialog submit
    $('#playerLogin').submit(function(e){
        e.preventDefault();
        let pname = $('#playername').val();
        let pcharacter = selectedChar;
        let loginInfo = { playername: pname, playercharacter: pcharacter}
        let msg = pname + " has joined as " + pcharacter;
        socket.emit('createGame', pname, pcharacter, msg);
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

// handle login dialog open
$('#loginDialog').dialog({
    modal: true,
    overlay: {
        opacity: 0.7,
        background: "black"
    }
});


// handle game messages
function displayGameMessage (msg) {
    msg = '<li>' + msg + '</li>';
    $('#messages').append(msg);
    //window.scrollTo(0, document.body.scrollHeight);
}
