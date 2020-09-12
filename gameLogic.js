'use strict';

var categoryArray = ['Sports', 'JavaScript', 'CSS'];
var sportsArray = ['BASEBALL', 'FOOTBALL', 'HOCKEY'];
var javaScriptArray = ['FUNCTION', 'VARIABLE', 'CONCATENATION']
var cssArray = ['BORDER', 'COLOR', 'ABSOLUTE'];
var prizeWheel = [250, 500, 600, 700, 800, 900, 1000, 5000, 'bankrupt', 'wild', 'BUST', 'deposit'];

var gameboardDisplayArray = [];
var currentRoundArray;
var currentCategory;
var currentWord;
var letterCounter = 0;
var userName;
var playerScore = 0;

var gameBoard = document.getElementById("gameBoard");
var alertText = document.getElementById('transitionAlert');
var userStarts = document.getElementById('newPlayer');

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
  var str = currWord;
  currWord = str.split('');
  currentRoundArray = currWord;
  console.log(currentRoundArray);
  return populateGameboard(currentRoundArray);
}


function populateGameboard(currRoundArray) { 
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
    letterCounter++;
  }

  //gets a reference to the category headline2 from game.html
  var categoryh2 = document.getElementById('category');

  //assigns the current category to the categoryh2 element to be displayed to the user on game.html
  categoryh2.textContent = 'Category: ' + currentCategory;
}

function currentSpin(){
  
}


var letterGuess = document.getElementById('guessField');


///////////////////this function handles the logic of when the user guesses a leter using the form field//////////////////////// 
function checkAnswer(event) {
  event.preventDefault();

  //this boolean lets us know the user got their current guess correct or incorrect for later
  var gotItRight = false;

  //this is how many letters the user guessed right this round so their money can be multiplied accordingly
  var multiplier = 0;

  //this gets a reference to the user's current guess so we can use the string
  var guess = event.target.name.value;

  //uses the .split() method on the string guess to turn the guess into an array
  var checkGuess = guess.split('');

  //checks to see if user tried to guess more than one letter at a time by seeing how many array elements are inside the checkGuess array we made above
  if(checkGuess.length > 1){
    //lets user know they can only guess one letter at a time
    window.alert('Guess only ONE letter at a time, please!');

    //emptys the field where you guess a letter because it's annoying when you don't
    event.target.name.value = null;

    //returns out of this function, ignoring everything below this point since we don't need it now
    return;
  }

  //----------This area checks the current hidden word to see if it contains any matching letters------------//

  //this sets all guesses to uppercase since I am using strict conditionals (===)
  guess = guess.toUpperCase();

  //goes through the currentRoundArray we got from the splitString() function above to see if the current guess matches any letters in the current hidden word
  for (var i = 0; i < currentRoundArray.length; i++) {

    //if it finds a match and the letterCounter isnt 0 (meaning the round isnt over yet)...
    if (guess === currentRoundArray[i] && letterCounter > 0) {

      //...first we add 1x to the multiplier for each letter it finds
      multiplier++;
      
      //lets us know the user got at least one correct this round
      gotItRight = true;

      //sets the gameboard display to reveal the correctly guessed hidden letter
      gameboardDisplayArray[i].innerHTML = currentRoundArray[i];

      //decrements the letterCounter by 1, when it reaches 0, the round will be over the puzzle is solved
      letterCounter--;
    } else if (guess !== currentRoundArray[i]) {//ignore wrong guesses}
    }    
  }
  
  //---------checks to see if user has won the round yet---------//  
  

  //if all letters have been guessed, banner is changed to win message and given new .className to begin the .youWin CSS transition.
  if (letterCounter === 0 && gotItRight === true) {
    console.log('round over-win');
    alertText.textContent = 'You Win!';
    alertText.className = 'youWin';
    
    //creates the button to advance to the next round
    var continueButton = document.createElement('button');
    var buttonSpace = document.getElementById('transitionArea');
    continueButton.type = 'button';
    continueButton.innerHTML = 'Next Round';
    continueButton.className = 'continueButton';
    buttonSpace.appendChild(continueButton);
    continueButton.onclick = function(){
      alertText.textContent = 'Let\'s Play!';
      alertText.className = 'letsPlay';
      gameBoard.innerHTML = '';
      guess = null;
      gameboardDisplayArray = [];
      currentRoundArray = [];
      buttonSpace.removeChild(continueButton);
      createGameboard();
    };
  }
  

  //emptys the field where you guess a letter because it's annoying when you don't
  event.target.name.value = null;
  checkGuess = null;
  gotItRight = false;
}

//the event listener for checkAnswer()
letterGuess.addEventListener('submit', checkAnswer);


//test logic
gameStart();
