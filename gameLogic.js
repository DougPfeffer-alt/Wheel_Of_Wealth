'use strict';

var categoryArray = ['Sports', 'JavaScript', 'CSS'];
var sportsArray = ['BASEBALL', 'FOOTBALL', 'HOCKEY', 'SOCCER', 'CRICKET', 'SQUASH', 'MARBLES', 'SWIMMING', 'RUGBY', 'CYCLING', 'GOLF', 'NASCAR', 'BOWLING', 'TENNIS', 'ARCHERY', 'HANDBALL', 'PICKLEBALL', 'BILLIARDS', 'SURFING', 'EQUESTRIAN', 'BASKETBALL', 'CLIMBING', 'GRAPPLING', 'GYMNASTICS', 'PARKOUR', 'FISHING'];
var javaScriptArray = ['FUNCTION', 'VARIABLE', 'CONCATENATION', 'ARRAYS', 'BOOLEAN', 'TRUTHY', 'FALSY', 'CONSOLE', 'LOOP', 'OBJECT', 'STRING', 'SYNTAX', 'DOCUMENT', 'SCRIPT', 'METHOD', 'PROPERTY', 'LITERAL', 'HIERARCHY', 'BUTTON', 'CHECKBOX', 'FORM', 'SUBMIT', 'TEXTAREA', 'HREF'];
var cssArray = ['BORDER', 'COLOR', 'ABSOLUTE', 'DECLARATION', 'PROPERTY', 'VALUE', 'SELECTOR', 'ELEMENT', 'CLASS', 'UNIVERSAL', 'ATTRIBUTE', 'PSEUDO', 'IDENTIFIER', 'MARGIN', 'PADDING', 'DECORATION', 'CHILD', 'SIBBLING', 'BACKGROUND', 'OPACITY'];
var usedPuzzles = [];
var prizeWheelArray = [250, 350, 500, 550, 600, 700, 750, 800, 900, 1000, 5000, 'bankrupt'];

var totalRounds = 3;
var currentRound = 0;
var gameboardDisplayArray = [];
var currentRoundArray;
var currentCategory;
var previousCategory;
var currentWord;
var letterCounter = 0;
var userName;
var currentPrizeNumber = 0;
//lets us know the current round is over
var roundOver = false;
var gameStarted = false;

var userNameforGameLogic = '';
var scoreTally = document.getElementById('playerScore');
scoreTally.className = 'totalScore';
var runningTotal = 0;
scoreTally.textContent += runningTotal;

var currentPrize = document.createElement('h2');
var previousPrize = document.createElement('h2');
var gameBoard = document.getElementById("gameBoard");
var alertText = document.getElementById('transitionAlert');

if (gameStarted === false) {
  gameStarted = true;
  if (localStorage.getItem('userName')) {
    userNameforGameLogic = JSON.parse(localStorage.getItem('userName'));
  } else {
    userNameforGameLogic = 'Player';
  }
  console.log(userNameforGameLogic);
  gameStart();
}


function gameStart() {
  return createGameboard();
}

function mathRand(max) {
  return Math.floor(Math.random() * max);
}

function createGameboard() {
  //1. select category
  while (currentCategory === previousCategory) {
    currentCategory = categoryArray[mathRand(categoryArray.length)];
  }
  previousCategory = currentCategory;
  //2. select hidden word
  if (currentCategory === 'Sports') {
    currentWord = sportsArray[mathRand(sportsArray.length)];
  } else if (currentCategory === 'JavaScript') {
    currentWord = javaScriptArray[mathRand(javaScriptArray.length)];
  } else if (currentCategory === 'CSS') {
    currentWord = cssArray[mathRand(cssArray.length)];
  }

  for (var i = 0; i < usedPuzzles.length; i++) {
    while (currentWord === usedPuzzles[i]) {
      if (currentCategory === 'Sports') {
        currentWord = sportsArray[mathRand(sportsArray.length)];
      } else if (currentCategory === 'JavaScript') {
        currentWord = javaScriptArray[mathRand(javaScriptArray.length)];
      } else if (currentCategory === 'CSS') {
        currentWord = cssArray[mathRand(cssArray.length)];
      }
    }
  }
  usedPuzzles.push(currentWord);
  return splitString(currentWord);
}

function splitString(currWord) {
  var str = currWord;
  currWord = str.split('');
  currentRoundArray = currWord;
  console.log(currentRoundArray);
  return populateGameboard();
}


function populateGameboard() {
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

  currentRound++;
  local_randomCounter = createRandomCounter();
  displayPrize(currentSpin());
}

//---------------------------this section deals with the simple random prize display we used for the MVP-----------------//

//this grabs a random prize from the prizeWheelArray[] and returns it
function currentSpin() {
  var prize = prizeWheelArray[mathRand(prizeWheelArray.length)];
  while (previousPrize === 'bankrupt' && prize === 'bankrupt') {
    prize = prizeWheelArray[mathRand(prizeWheelArray.length)];
  }
  return prize;
}

//first creates a counter of how many random numbers we see before it stops, this counter is also random (between 20-40) to create differences in timing
function createRandomCounter() {
  var randomCounter = mathRand(10) + 20;
  return randomCounter;
}




//this function creates a new local randomcounter to use as the amount of prize results to show during the 'spinning' phase before the player can guess
var local_randomCounter = 0;
function displayPrize(prizeAmount) {
  if (local_randomCounter === 0) {
    local_randomCounter = createRandomCounter();
  }

  var prizeDisplayArea = document.getElementById('transitionArea');

  if (prizeAmount !== 'bankrupt') {
    currentPrizeNumber = prizeAmount;
    currentPrize.textContent = '$' + prizeAmount;
  } else {
    currentPrize.textContent = prizeAmount;
  }

  currentPrize.className = 'prizeSpin';
  prizeDisplayArea.appendChild(currentPrize);
  local_randomCounter--;
  console.log(currentPrize.textContent);
  if (local_randomCounter > 0) {
    setTimeout(displayPrize, 100, currentSpin());
  }
  else if (local_randomCounter === 0 && currentPrize.textContent !== 'bankrupt') {
    currentPrize.className = 'currentPrize';
    previousPrize = currentPrize;
  }
  else if (local_randomCounter === 0 && currentPrize.textContent === 'bankrupt') {
    console.log('bankrupt');
    currentPrize.className = 'bankrupt';
    previousPrize = currentPrize;
    runningTotal = 0;
    scoreTally.textContent = 'Daily Total: $';
    scoreTally.textContent += runningTotal;
    currentPrize.textContent = 'YOU\'RE BANKRUPT!!! SPIN AGAIN!';
    local_randomCounter = createRandomCounter();
    setTimeout(displayPrize, 3500, currentSpin());
  }
}


///////////////////this function handles the logic of when the user guesses a leter using the form field////////////////////////

//gets an html reference to the form area where the user can guess letters
var letterGuess = document.getElementById('guessField');


function checkAnswer(event) {
  event.preventDefault();
  if (letterCounter > 0 && roundOver === false && local_randomCounter === 0) {

    //this boolean lets us know the user got their current guess correct or incorrect for later
    var gotItRight = false;

    //this is how many letters the user guessed right this round so their money can be multiplied accordingly
    var multiplier = 0;

    //this gets a reference to the user's current guess so we can use the string
    var guess = event.target.name.value;

    //uses the .split() method on the string guess to turn the guess into an array
    var checkGuess = guess.split('');

    //checks to see if user tried to guess more than one letter at a time by seeing how many array elements are inside the checkGuess array we made above
    if (checkGuess.length > 1) {
      //lets user know they can only guess one letter at a time
      window.alert('Guess only ONE letter at a time, please!');

      //emptys the field where you guess a letter because it's annoying when you don't
      event.target.name.value = null;

      //returns out of this function, ignoring everything below this point since we don't need it now
      return;
    } else if (checkGuess.length === 0) {
      //lets user know they have to guess a letter
      window.alert('You gotta Guess a LETTER to make money!');

      //emptys the field where you guess a letter because it's annoying when you don't
      event.target.name.value = null;

      //returns out of this function, ignoring everything below this point since we don't need it now
      return;
    }

    //----------This area checks the current hidden word to see if it contains any matching letters------------//

    //this sets all guesses to uppercase since I am using strict conditionals (===)
    guess = guess.toUpperCase();

    //checks to make sure user hasn't already used the current letter guess
    for (var k = 0; k < gameboardDisplayArray.length; k++) {

      if (guess === gameboardDisplayArray[k].textContent) {
        currentPrize.textContent = 'You already guessed ' + guess + ' unfortunately! Spin again!';
        local_randomCounter = createRandomCounter();
        setTimeout(resetPrizeText, 2000);
        setTimeout(displayPrize, 1100, currentSpin());
        //emptys the field where you guess a letter because it's annoying when you don't
        event.target.name.value = null;
        checkGuess = null;
        gotItRight = false;
        return;
      }
    }

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

        //replaces original letters with a _ so we can't keep guessing the same letters
        currentRoundArray[i] = '_';

        //decrements the letterCounter by 1, when it reaches 0, the round will be over the puzzle is solved
        letterCounter--;
      } else if (guess !== currentRoundArray[i]) {//ignore wrong guesses}
      }
    }

    if (gotItRight === true) {
      currentPrizeNumber = parseInt(currentPrizeNumber, 10);
      runningTotal += multiplier * currentPrizeNumber;
      scoreTally.textContent = 'Daily Total: $';
      scoreTally.textContent += runningTotal;
      if (multiplier === 1) {
        currentPrize.textContent = 'Yes! There is ' + multiplier + ' ' + guess + '!';
      } else if (multiplier > 1) {
        currentPrize.textContent = 'There are ' + multiplier + ' ' + guess + '\'s! Nice job!';
      }
      if (roundOver === false && letterCounter > 0) {
        local_randomCounter = createRandomCounter();
        setTimeout(displayPrize, 1100, currentSpin());
      }
    }
    if (gotItRight === false) {
      currentPrize.textContent = 'No ' + guess + '\'s, unfortunately! Spin again!';
      local_randomCounter = createRandomCounter();
      setTimeout(resetPrizeText, 2000);
      setTimeout(displayPrize, 1100, currentSpin());
    }
    //---------checks to see if user has won the round yet---------//

    //if all letters have been guessed, banner is changed to win message and given new .className to begin the .youWin CSS transition.
    if (letterCounter === 0 && gotItRight === true && currentRound < totalRounds) {
      alertText.textContent = 'Puzzle Solved!';
      alertText.className = 'youWin';
      currentPrize.className = 'roundOver';
      currentPrize.innerHTML = '';
      roundOver = true;

      //creates the button to advance to the next round
      var continueButton = document.createElement('button');
      var buttonSpace = document.getElementById('transitionArea');
      continueButton.type = 'button';
      continueButton.innerHTML = 'Next Round';
      continueButton.className = 'continueButton';
      buttonSpace.appendChild(continueButton);
      continueButton.onclick = function () {
        alertText.textContent = 'Let\'s Play!';
        alertText.className = 'letsPlay';
        gameBoard.innerHTML = '';
        guess = null;
        gameboardDisplayArray = [];
        currentRoundArray = [];
        buttonSpace.removeChild(continueButton);
        roundOver = false;
        createGameboard();
      };
    } else if (letterCounter === 0 && currentRound === totalRounds) {
      alertText.textContent = 'Puzzle Solved!';
      alertText.className = 'youWin';
      currentPrize.className = 'roundOver';
      currentPrize.innerHTML = '';
      roundOver = true;

      setTimeout(endGame, 2000);
    }
  }
  //emptys the field where you guess a letter because it's annoying when you don't
  event.target.name.value = null;
  checkGuess = null;
  gotItRight = false;
}

//resets the message in the prize box back to the cash value
function resetPrizeText() {
  currentPrize.textContent = '$' + currentPrizeNumber;
}

function endGame() {
  alertText.textContent = 'Game Over!';
  setTimeout(endMessages, 3000);
}

function endMessages() {
  alertText.textContent = 'Daily Total: $' + runningTotal;
  setTimeout(goToHSList, 4000);
}

function goToHSList() {
  //trying to fix this!
  userMakesHSList(userNameforGameLogic, runningTotal);
  location.replace('High_Score.html');
}

//the event listener for checkAnswer()
letterGuess.addEventListener('submit', checkAnswer);



