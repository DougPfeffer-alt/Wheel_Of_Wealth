'use strict';

var categoryArray = ['Sports', 'JavaScript', 'CSS'];
var sportsArray = ['BASEBALL', 'FOOTBALL', 'HOCKEY'];
var javaScriptArray = ['FUNCTION', 'VARIABLE', 'CONCATENATION']
var cssArray = ['BORDER', 'COLOR', 'ABSOLUTE'];
var gameboardDisplayArray = [];
var currentRoundArray;
var currentCategory;
var currentWord;
var userName;

function clicksBegin() {
  if (userName === undefined) {
    console.log('go to name input');
    //var submitButtton = document.getElementById('submitButton');
    //submitButton.addEventListener('submit', gameStart());   
  }
  else {
    console.log('game starts with current userName');
  }
}

function gameStart() {
  console.log('Display Game Intro!');
  return createGameboard();
}

function mathRand(max) {
  return Math.floor(Math.random() * max);
}

function createGameboard() {
  //1. select category
  currentCategory = categoryArray[mathRand(categoryArray.length)];
  console.log('1');
  //2. select hidden word
  if (currentCategory === 'Sports') {
    currentWord = sportsArray[mathRand(sportsArray.length)];
  } else if (currentCategory === 'JavaScript') {
    currentWord = javaScriptArray[mathRand(javaScriptArray.length)];
  } else if (currentCategory === 'CSS') {
    currentWord = cssArray[mathRand(cssArray.length)];
  }
  return splitString(currentWord);
}

function splitString(currWord) {
  console.log('2');
  var str = currWord;
  currWord = str.split('');
  currentRoundArray = currWord;
  console.log(currentRoundArray);
  return populateGameboard(currentRoundArray);
}


function populateGameboard(currRoundArray) {
  console.log('3');
  var gameBoard = document.getElementById("gameBoard");
  var tableBody = document.createElement('tbody');
  gameBoard.appendChild(tableBody);
  var tableRow1 = document.createElement('tr');
  var tableRow2 = document.createElement('tr');
  gameBoard.appendChild(tableRow1);
  gameBoard.appendChild(tableRow2);

  for (var i = 0; i < currentRoundArray.length; i++) {
    var letterCell = document.createElement('td');
    letterCell.innerHTML = ' ';
    letterCell.setAttribute('id', 'letters');
    tableRow1.appendChild(letterCell);
    gameboardDisplayArray.push(letterCell);    
  }
}



var letterGuess = document.getElementById('guessField');

function handleSubmit(event) {
  event.preventDefault();

  var gotItRight = false;
  var multiplier = 0;
  var guess = event.target.name.value;
  guess = guess.toUpperCase();
  console.log(guess);
  for (var i = 0; i < currentRoundArray.length; i++) {
    if (guess === currentRoundArray[i]) {
      multiplier++;      
      gotItRight = true;
      gameboardDisplayArray[i].innerHTML = currentRoundArray[i];
    } else if (guess !== currentRoundArray[i]) {//ignore wrong guesses}
    }

    if (gotItRight === true) {      
    }
  }
  event.target.name.value = null;
}

letterGuess.addEventListener('submit', handleSubmit);

gameStart();
