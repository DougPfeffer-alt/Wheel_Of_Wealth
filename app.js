'use strict';

//global var here
var newPlayer = document.getElementById('newPlayer');
var tableBody = document.getElementById('highScoreTable');
var headerPlayer = document.createElement('th');
var headerScore = document.createElement('th');
// var placement = [];
var allPlayers = [];
var hiScoreArray = [];
var userName = 'username';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var userMakesHSList = function(name, score) {  
  if (localStorage.getItem('hiScoreArray')) {
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));    
    console.log('got from storage');
    for(var i = 0; i < hiScoreArray.length; i++){
      var tempName = ' ';
      var tempScore = 0;
      tempName = hiScoreArray[i].name;
      tempScore = hiScoreArray[i].score;
      console.log(tempName);
     new Player(tempName, tempScore);
    }    
    hiScoreArray.push(new Player(name, score));
  } else {
    console.log('made new list');
    new Player('Nebiyu', '100');
    new Player('Doug', '90');
    new Player('Louis', '80');
    new Player('Mike', '70');
    new Player('Paully', '60');
    new Player('JakeTown', '50');
    new Player('Bob', '40');
    new Player('Carol', '30');
    new Player('Alice', '20');
    new Player('Ted', '10');
  }
  allPlayers.sort(function (a, b) { return a.score - b.score; });
  allPlayers.reverse();

  if(allPlayers.length > 10){
    hiScoreArray.pop();
    console.log('popped');
  }
  hiScoreArray = JSON.stringify(allPlayers);
  localStorage.setItem('hiScoreArray', hiScoreArray);
  
}

Player.prototype.render = function () {
  var playerRow = document.createElement('tr');
  var scoreRow = document.createElement('tr');
  var highScoreName = document.createElement('th');
  highScoreName.className = 'hiscoreTh';
  var highScore = document.createElement('th');
  highScore.className = 'hiscoreCell';
  highScoreName.textContent = this.name;
  highScore.textContent = this.score;
  scoreRow.appendChild(highScore);
  playerRow.appendChild(highScoreName);
  playerRow.appendChild(scoreRow);
  tableBody.appendChild(playerRow);
};


function handleSubmit(event) {
  userName = event.target.name.value;
  event.preventDefault();
}

function renderTable() {

  renderHeader();
  for (var i = 0; i < allPlayers.length; i++) {
    allPlayers[i].render();
  }
}

function renderHeader() {
  var headerRow = document.createElement('tr');
  headerScore.textContent = 'PLAYER';
  headerPlayer.textContent = 'SCORE';
  console.log(headerScore);
  headerRow.appendChild(headerScore);
  headerRow.appendChild(headerPlayer);
  tableBody.appendChild(headerRow);
}


userMakesHSList('Mike', 1000);
renderTable();

function Player(name, score) {
  this.name = name;
  this.score = score;
  allPlayers.push(this);
}










// //global var here
// var newPlayer = document.getElementById('newPlayer');
// var tableBody = document.getElementById('highScoreTable');
// var placement = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
// var allPlayers = [];
// var hiScoreArray = [];

// //Random Math
// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;

// }



// Player.prototype.render = function () {
//   var tableEl = document.getElementById('highScoreTable');
//   var playerRow = document.createElement('tr');
//   var highScoreName = document.createElement('th');
//   var highScore = document.createElement('th');
//   highScoreName.textContent = this.name;
//   // tableEl.appendChild(playerRow);
//   highScore.textContent = this.score;
//   highScoreName.appendChild(highScore);
//   playerRow.appendChild(highScoreName);
//   tableBody.appendChild(playerRow);
// };
// function userMakesHSList(name, score) {
//   //adds new user score to array
//   new Player(name, score);


//   //if there is already a hi score array in local storage, use that one instead
//   if (localStorage.getItem('playerArray')) {
//     //parses the stringified data back to an array type object
//     hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
//   }
//   //if there is nothing in local storage, the default hi score list is loaded instead
//   else {
//     new HiScore('Nebiyu', 100);
//     new HiScore('Doug', 90);
//     new HiScore('Louis', 80);
//     new HiScore('Mike', 70);
//     new HiScore('Paully', 60);
//     new HiScore('JakeTown', 50);
//     new HiScore('Bob', 40);
//     new HiScore('Carol', 30);
//     new HiScore('Alice', 20);
//     new HiScore('Ted', 10);
//   }

//   //sorts function from lowest score to highest score
//   hiScoreArray.sort(function (a, b) { return a.score - b.score; });

//   //reverses order of array elements to make highest score the first element
//   hiScoreArray.reverse();

//   //there can only be 10 people in the hi score list, so the last is removed
//   hiScoreArray.pop();
// }

// //this function will be the last thing called after the game is over, creating the hi score list.
// // userMakesHSList('MKG', 1000);

// //console debug
// console.log(hiScoreArray);

// //table

//   newPlayer = event.target.name.value;
//   console.log(event.target.name.value);
//   newPlayer = new Player(newPlayer);
//   event.target.playerName.value = null;
//   // renderTable();

// // asking user their name and logging it in local storage
// // maybe using a form we will ask the user- name and info

// //render the table with the high score
// function renderTable() {

//   renderHeader();
//   for (var i = 0; i < allPlayers.length; i++) {
//     allPlayers[i].render();
//   }
// }

// // newPlayer.addEventListener('submit', handleSubmit);

// // constructor functions
// function renderHeader() {
//   var headerRow = document.createElement('tr');
//   var headerPlayer = document.createElement('th');
//   var headerScore = document.createElement('th');
//   headerScore.textContent = 'highScoreTable';
//   console.log(headerScore);

//   for (var i = 0; i < placement.length; i++) {
//     var headerPlacement = document.createElement('th');
//     headerPlacement.textContent = placement[i];
//     headerPlayer.appendChild(headerPlacement);
//   }
//   headerRow.appendChild(headerScore);
//   headerRow.appendChild(headerPlayer);
//   tableBody.appendChild(headerRow);
// }


// userMakesHSList();
// renderTable();


//just animation font style neb

