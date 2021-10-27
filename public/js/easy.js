// var cpuIcon = 'X';
// var playerIcon = 'O';
// var AIMove;
// //settings for liveBoard: 1 is cpuIcon, -1 is playerIcon, 0 is empty
// var liveBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
// var winningLines = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6]
// ];

// //UI
// function renderBoard(board) {
//   board.forEach(function(el, i) {
//     var squareId = '#' + i.toString();
//     if (el === -1) {
//       $(squareId).text(playerIcon);
//     } else if (el === 1) {
//       $(squareId).text(cpuIcon);
//     }
//   });

//   $('.square:contains(X)').addClass('x-marker');
//   $('.square:contains(O)').addClass('o-marker');
// }

// function animateWinLine() {
//   var idxOfArray = winningLines.map(function(winLines) {
//     return winLines.map(function(winLine) {
//       return liveBoard[winLine];
//     }).reduce(function(prev, cur) {
//       return prev + cur;
//     });
//   });
//   var squaresToAnimate = winningLines[idxOfArray.indexOf(Math.abs(3))];

//   squaresToAnimate.forEach(function(el) {
//       $('#' + el).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
//     });
// }

// //MODALS
// function chooseMarker() {
//   $('.modal-container').css('display', 'block');
//   $('.choose-modal').addClass('animated bounceInUp');

//   $('.button-area span').click(function() {
//     var marker = $(this).text();
//     playerIcon = (marker === 'X' ? 'X' : 'O');
//     cpuIcon = (marker === 'X' ? 'O' : 'X');

//     $('.choose-modal').addClass('animated bounceOutDown');
//     setTimeout(function() {
//       $('.modal-container').css('display', 'none');
//       $('.choose-modal').css('display','none');
//       startNewGame();
//     }, 700);

//     $('.button-area span').off();
//   });
// }

// function endGameMessage(){
//   var result = checkVictory(liveBoard);
//   $('.end-game-modal h3').text(result === 'win' ? 'You Lost' : "It's a draw");

//   $('.modal-container').css('display', 'block');
//   $('.end-game-modal').css('display','block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');

//   $('.button-area span').click(function() {

//     $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');

//     setTimeout(function() {
//       $('.modal-container').css('display', 'none');
//       startNewGame();
//     }, 700);

//     $('.button-area span').off();
//   });
// }

// //GAMEPLAY
// function startNewGame() {
//   liveBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//   $('.square').text("").removeClass('o-marker x-marker');
//   renderBoard(liveBoard);
//   playerTakeTurn();
// }

// function playerTakeTurn() {
//   $('.square:empty').hover(function() {
//     $(this).text(playerIcon).css('cursor', 'pointer');
//   }, function() {
//     $(this).text('');
//   });

//   $('.square:empty').click(function() {
//     $(this).css('cursor', 'default');
//     liveBoard[parseInt($(this).attr('id'))] = -1;
//     renderBoard(liveBoard);

//     if (checkVictory(liveBoard)) {    
//       setTimeout(endGameMessage,(checkVictory(liveBoard) === 'win') ? 700 : 100);
//     } else {
//       setTimeout(aiTakeTurn, 100);
//     }
//     $('.square').off();
//   });
// }

// function aiTakeTurn() {
//   miniMax(liveBoard, 'aiPlayer');
//   liveBoard[AIMove] = 1;
//   renderBoard(liveBoard);
//   if (checkVictory(liveBoard)) {
//     animateWinLine();
//     setTimeout(endGameMessage, checkVictory(liveBoard) === 'win' ? 700 : 100);
//   } else {
//     playerTakeTurn();
//   }
// }

// //UTILITIES
// function checkVictory(board) {
//   var squaresInPlay = board.reduce(function(prev, cur) {
//     return Math.abs(prev) + Math.abs(cur);
//   });

//   var outcome = winningLines.map(function(winLines) {
//     return winLines.map(function(winLine) {
//       return board[winLine];
//     }).reduce(function(prev, cur) {
//       return prev + cur;
//     });
//   }).filter(function(winLineTotal) {
//     return Math.abs(winLineTotal) === 3;
//   });

//   if (outcome[0] === 3) {
//     return 'win';
//   } else if (outcome[0] === -3) {
//     return 'lose';
//   } else if (squaresInPlay === 9) {
//     return 'draw';
//   } else {
//     return false;
//   }
// }

// function availableMoves(board) {
//   return board.map(function(el, i) {
//     if (!el) {
//       return i;
//     }
//   }).filter(function(e) {
//     return (typeof e !== "undefined");
//   });
// }

// //AI
// //minimax algorithm - explanation here: http://http://neverstopbuilding.com/minimax
// function miniMax(state, player) {
//   //base cases: check for an end state and if met - return the score from the perspective of the AI player.  
//   var rv = checkVictory(state);
//   if (rv === 'win') {
//     return 10;
//   }
//   if (rv === 'lose') {
//     return -10;
//   }
//   if (rv === 'draw') {
//     return 0;
//   }

//   var moves = [];
//   var scores = [];
//   //for each of the available squares: recursively make moves and push the score + accompanying move to the moves + scores array
//   availableMoves(state).forEach(function(square) {
//     state[square] = (player === 'aiPlayer') ? 1 : -1;
//     scores.push(miniMax(state, (player === 'aiPlayer') ? 'opponent' : 'aiPlayer'));
//     moves.push(square);
//     state[square] = 0;
//   });

//   //calculate and return the best score gathered from each of the available moves. track the best movein the AIMove variable

//   if (player === 'aiPlayer') {
//     AIMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
//     return Math.max.apply(Math, scores);
//   } else {
//     AIMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
//     return Math.min.apply(Math, scores);
//   }
// }

// renderBoard(liveBoard);
// chooseMarker();

var winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
var squareCount = 9;
var squares = document.getElementsByClassName("square");
var difficulty = "moron";
var gameOver = false;

var setMessageBox = function (caption) {
  var messageBox = document.getElementById("messageBox");
  messageBox.innerHTML = caption;
};

var findClaimedSquares = function (marker) {
  var claimedSquares = [];
  var value;

  for (var id = 0; id < squareCount; id++) {
    value = document.getElementById(id).innerHTML;
    if (value === marker) {
      claimedSquares.push(id);
    }
  }

  return claimedSquares;
}

var resetGame = function () {
  gameOver = false;
  setMessageBox("Pick a square!");

  for (var id = 0; id < squareCount; id++) {
    var square = document.getElementById(id);
    square.innerHTML = "";
    square.style.backgroundColor = "rgb(102, 178, 255)";
  }
}

var checkForWinCondition = function (marker) {
  var claimedSquares = findClaimedSquares(marker);

  var win = false;
  for (var i = 0; i < winConditions.length; i++) {
    win = winConditions[i].every(element => claimedSquares.indexOf(element) > -1);
    if (win) {
      win = winConditions[i];
      break;
    }
  }
  return win;
};

var secureWin = function () {
  return makeMove("O");
}

var preventDefeat = function () {
  return makeMove("X");
}

var makeMove = function (marker) {
  var moveMade = false;
  for (var i = 0; i < winConditions.length; i++) {
    var count = 0;
    for (var j = 0; j < winConditions[i].length; j++) {
      if (marker === document.getElementById(winConditions[i][j]).innerHTML) {
        count++;
      }
    }

    if (count == 2) {
      for (j = 0; j < winConditions[i].length; j++) {
        var square = document.getElementById(winConditions[i][j])
        if (squareIsOpen(square)) {
          square.innerHTML = "O";
          moveMade = true;
          break;
        }
      }
    }

    if (moveMade) {
      break;
    }
  }
  return moveMade;
}

var opponentMove = function () {
  if (difficulty === "moron") {
    makeMoveAtFirstAvailableSquare();
  } else {
    var moveMade = secureWin()
    if (!moveMade) {
      moveMade = preventDefeat();
      if (!moveMade) {
        var center = document.getElementById(4);
        if (squareIsOpen(center)) {
          center.innerHTML = "O";
        } else {
          makeMoveAtFirstAvailableSquare();
        }
      }
    }
  }
}

var makeMoveAtFirstAvailableSquare = function () {
  for (var id = 0; id < squareCount; id++) {
    square = document.getElementById(id);
    if (squareIsOpen(square)) {
      square.innerHTML = "O";
      break;
    }
  }
}

var squareIsOpen = function (square) {
  return (square.innerHTML !== "X" && square.innerHTML !== "O");
}

var highlightWinningSquares = function (winningSquares, color) {
  for (var i = 0; i < winningSquares.length; i++) {
    document.getElementById(winningSquares[i]).style.backgroundColor = color;
  }
}

var checkForDraw = function () {
  var draw = true;
  for (var id = 0; id < squareCount; id++) {
    if (squareIsOpen(document.getElementById(id))) {
      draw = false;
      break;
    }
  }
  return draw;
}

var chooseSquare = function () {
  difficulty = document.getElementById("difficulty").value;
  if (!gameOver) {
    setMessageBox("Pick a square!");
    var id = this.getAttribute("id");
    var square = document.getElementById(id);
    if (squareIsOpen(square)) {
      square.innerHTML = "X";
      var win = checkForWinCondition("X");
      if (!win) {
        opponentMove();
        var lost = checkForWinCondition("O");
        if (!lost) {
          var draw = checkForDraw();
          if (draw) {
            gameOver = true;
            setMessageBox("It's a draw!");
          }
        } else {
          gameOver = true;
          highlightWinningSquares(lost, "rgb(229, 55, 55)");
          setMessageBox("You lost!");
        }
      } else {
        gameOver = true
        highlightWinningSquares(win, "rgb(42, 178, 72)");
        setMessageBox("You won!");
      }

    } else {
      setMessageBox("That square is already taken!");
    }
  }
};


for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', chooseSquare, false);
}