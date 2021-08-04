(function (){
    "use strict"
    const startGame = document.getElementById("startgame");
        const gameControl = document.getElementById("gamecontrol");
        const game = document.getElementById("game");
        const score = document.getElementById("score");
        const actionArea = document.getElementById("actions");

        let gameData = {
            dice: ["1die.jpg", "2die.jpg", "3die.jpg", "4die.jpg", "5die.jpg", "6die.jpg"],
            players: ["player 1", "player 2"],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            turns: 1,
            gameEnd: 29
        };

        startGame.addEventListener("click", function() {

            gameData.turns = Math.round(Math.random()+1);
            console.log(gameData.turns);

            gameControl.innerHTML = "<h2> The game has started</h2>";
            gameControl.innerHTML += "<button id='quit'>Do you want to quit?</button>"

            document.getElementById("quit").addEventListener("click", function() {
                location.reload();
            });
            setUpTurn();
        })

        function setUpTurn () {
            game.innerHTML = `<p>Roll the dice for player ${gameData.turns}</p>`;
            actionArea.innerHTML = "<button id='roll'>Roll the dice!</button>";
            document.getElementById("roll").addEventListener("click", function() {
                throwDice();
            })
        }

        function throwDice() {
            actionArea.innerHTML = "";
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            game.innerHTML = `<p>Roll the dice for player ${gameData.turns}</p>`;
            game.innerHTML += `<img src='${gameData.dice[gameData.roll1 - 1]}' alt='dice'/>`;
            game.innerHTML += `<img src='${gameData.dice[gameData.roll2 - 1]}' alt='dice'/>`;
            gameData.rollSum = gameData.roll1 + gameData.roll2;
            if ( gameData.rollSum === 2) {
                game.innerHTML += "<p>Oh snap! Snake eyes!</p>"
                gameData.score[gameData.turns - 1] = 0;
                oneIsRoll(); 
            }
            else if ( gameData.roll1 === 1 || gameData.roll2 === 1) {
                gameData.turns - 1 ? (gameData.turns = 1) : (gameData.turns = 2);
                game.innerHTML += `<p>Sorry, one of your rolls is one, switching to player ${gameData.turns}</p>`
                oneIsRoll();
            }
            else {
                gameData.score[gameData.turns - 1] += gameData.rollSum;
                actionArea.innerHTML = "<button id = 'rollagain'>Roll Again</button> or <button id = 'pass'>Pass</button>";

                document.getElementById("rollagain").addEventListener("click", function () {
                    throwDice();
                });
                document.getElementById("pass").addEventListener("click", function () {
                    switchPlayer();
                });               
                checkWinningCondition();
            }
        }

        function switchPlayer() {
            gameData.turns - 1 ? (gameData.turns = 1) : (gameData.turns = 2);
            setTimeout( setUpTurn(), 200);
        }

        function oneIsRoll () {
            actionArea.innerHTML = `<button id="switch">Switch to next player.</button>`;
            document.getElementById("switch").addEventListener("click", function () {
                showCurrentScore();
                switchPlayer();
            });  
        }

        function checkWinningCondition() {
            if ( gameData.score[gameData.turns - 1] > gameData.gameEnd) {
                score.innerHTML = `<h2>Player ${gameData.turns} wins with ${gameData.score[gameData.turns - 1]} points</h2>`;
                actionArea.innerHTML = "";
                document.getElementById("quit").innerHTML = "Start a new game";
            }
            else {
                showCurrentScore();
            }
        }

        function showCurrentScore() {
            score.innerHTML = `<p>The score for <strong>player 1 is ${gameData.score[0]}</strong> and the score for <strong>player 2 is ${gameData.score[1]}</strong></p>`;
        }
})();