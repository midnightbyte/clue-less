
let selectedChar;
let mysocketID;
let gameStarted = false;
let playerData;


$(document).ready(function(){
    let socket = io.connect('http://localhost:1234');

    socket.on('connected', function(data) {
        clearGameMessage();
        displayGameMessage('waiting for players ...')
        mysocketID = data.id;
        socket.emit('initialize');
    });

    // handle player join
    socket.on('playerJoined', function(data){

     //   displayGameMessage(msg);
    });

    socket.on('playerDisconnected', function(data){
      //  $("#messages").load(window.location.href + " #messages" );
        displayGameMessage('player has left');
    });

    socket.on('availableCharacters', function(data) {
        setCharacterList(data.charList);
    });

    socket.on('selectedCharacters', function(data) {
        setCharacterList(data.charList);
        setPlayerList(data.game.players);


        $('#loginbutton').remove();
        if (data.game.players.length >= 3) {
            $('#startbutton').toggle();
        }
    })

    // handle login dialog submit
    $('#playerLogin').submit(function(e){
        e.preventDefault();
        let pname = $('#playername').val();
        let pcharacter = selectedChar;
        let charInfo = { playername: pname, playercharacter: pcharacter};

        socket.emit('selectedCharacter', charInfo);
        $('#loginDialog .close').click();
    });

    // handle start game submit
    $('#startGame').click(function(e){
        e.preventDefault();
        console.log("game started");
        socket.emit('startgame');
    });

    socket.on('showGame', function(data) {
        $('#startbutton').toggle();
        $('#checklist').toggle();
        $('#suggestButton').toggle();
        $('#accuseButton').toggle();
        $('#endTurnButton').toggle();
        $("#gameBoardContainer").toggle();
        displayGameMessage(data.msg);
        let thisplayer;
        if (data.game.players.length > 0) {
            for (let i = 0; i < data.game.players.length; i++) {
                setToken(data.game.players[i].character);
                console.log('firstplayer id' + data.firstPlayer);
                console.log('socket id' + mysocketID)

                if (data.firstPlayer === mysocketID) {
                    thisplayer = data.game.players[i];
                    displayCards(thisplayer);
                    if (data.game.whosturn.id === thisplayer.id) {
                        displayGameMessage('<b><font color="red" size="+2">Your turn!</font></b>');
                    }
                } else {
                    if (data.game.players[i].mysocket === mysocketID) {
                        thisplayer = data.game.players[i];
                        displayCards(thisplayer);
                        displayGameMessage('<b><font color="red">' + thisplayer.character + ' goes first!</font></b>');
                    }
                }
            }
        }
        socket.emit('updateNeeded');

        //Allows player to drag character
        $('character#' + thisplayer.character).addClass('draggable');
        $('character#' + thisplayer.character).draggable({
            containment: "#gameBoardContainer",
            snap: "canvas",
            snapMode: "inner",
            stop: function (event, ui) {
                if(socket.moveable){
                    var possibleTargets = $('canvas').filter(function(index) {
                        return ($(this).offset().left <= ui.offset.left && $(this).offset().top <= ui.offset.top);
                    });


                    var currentPlayerData = data.game.players.filter(function (data){
                        return data.id === currentPlayerData.mysocket;
                    })[0];

                    var target = possibleTargets[possibleTargets.length-1];

                    if(validMove(currentPlayerData.location, target)){
                        if(possibleTargets.length > 0 && target.id){
                            //if the target is a hallway then check to make sure it isn't occupied
                            if(target.id.indexOf('_') != -1){
                                $('button#makeSuggestion').hide();
                                var occupiedLocation = playerData.filter(function (data){
                                    return data.location == target.id;
                                });
                                if(occupiedLocation.length == 0){
                                    socket.emit('moveTo', player.character, target.id);
                                    socket.moveable = false;
                                }
                            }
                            else{
                                $("select#suggestionRoomSelect").val(target.id);
                                $("select#suggestionRoomSelect").attr('disabled', 'disabled');
                                $('button#makeSuggestion').show();
                                socket.emit('moveTo', player.character, target.id);
                                socket.moveable = false;
                            }
                        }
                    }
                    else{
                        alert('Please make a valid move');
                    }
                }
                else{
                    alert('Player is unable to move at this time');
                }
                socket.emit('triggerUpdate');
            }
        });
    });

    socket.on('updateBoard', function(data) {
        console.log('updating the game board');
        updateGameBoard(data);
    });



    socket.on('createGameResponse', (msg) => {
        console.log(msg);
        $('#playerslist').append("<p>" + msg + "</p>")
    });

    socket.on('message', function(message) {
        alert('server message: ' + message);
    });

    $('#suggestForm').click(function(e){
        e.preventDefault();
        console.log("suggestion");
        $('#suggestDialog').toggle();
        socket.emit('suggestion');
    });

    $('#accuseForm').click(function(e){
        e.preventDefault();
        console.log("accusation");
        $('#accuseDialog').toggle();
        socket.emit('accusation');
    });

    $('#endTurnForm').click(function(e){
        e.preventDefault();
        console.log("endTurn");
        socket.emit('endTurn');
    });
});
