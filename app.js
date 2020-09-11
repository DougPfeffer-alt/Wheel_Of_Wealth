'use strict';

//global var here
var newPlayer = document.getElementById('newPlayer');
var placement = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var allPlayers = [];
var hiScoreArray = [];

//Random Math
// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;

// }

//constructor functions
function Player(name) {
  this.name = name;
  this.totalScore = [];
  allPlayers.push(this);
}
console.log(allPlayers);
//how we push the high score highScore arry
function HiScore(name, score) {
  this.name = name;
  this.score = score;
  hiScoreArray.push(this);
}

Player.prototype.render = function() {
  var tableEl = document.getElementById('highScoreTable');
  var highScoreTableEl = document.createElement('th');
  highScoreTable.textContent = this.name;
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.appendChild(thEl);
};
function userMakesHSList(name, score) {
  //adds new user score to array
  new HiScore(name, score);

  //if there is already a hi score array in local storage, use that one instead
  if (localStorage.getItem('hiScoreArray')) {
    //parses the stringified data back to an array type object
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
  }
  //if there is nothing in local storage, the default hi score list is loaded instead
  else {
    new HiScore('Nebiyu', 100);
    new HiScore('Doug', 90);
    new HiScore('Louis', 80);
    new HiScore('Mike', 70);
    new HiScore('Paully', 60);
    new HiScore('JakeTown', 50);
    new HiScore('Bob', 40);
    new HiScore('Carol', 30);
    new HiScore('Alice', 20);
    new HiScore('Ted', 10);
  };

  //sorts function from lowest score to highest score
  hiScoreArray.sort(function (a, b) { return a.score - b.score; });

  //reverses order of array elements to make highest score the first element
  hiScoreArray.reverse();

  //there can only be 10 people in the hi score list, so the last is removed
  hiScoreArray.pop();
}

//this function will be the last thing called after the game is over, creating the hi score list.
userMakesHSList('MKG', 1000);

//console debug
console.log(hiScoreArray);

//table

function handleSubmit() {
  event.preventDefault();

  newPlayer = event.target.playerName.value;
  newPlayer = new Player(newPlayer);
  event.target.playerName.value = null;
  // renderTable();


}

var tableBody = document.getElementById('highScoreTable');

function renderHeader() {
  var headerRow = document.createElement('tr');
  var headerPlayer = document.createElement('th');
  var headerScore = document.createElement('th');
  headerScore.textcontent = 'Score';
  headerRow.appendChild(headerPlayer);
  tableBody.appendChild(headerRow);

  for (var i = 0; i < placement.length; i++) {
    var headerPlacement = document.createElement('th');
    headerPlacement.textContent = placement[i];
    headerScore.appendChild(headerPlacement);
    headerRow.appendChild(headerPlacement);
  }
}



// asking user their name and logging it in local storage
// maybe using a form we will ask the user- name and info

//render the table with the high score
function renderTable() {
  // table.innerHTML = '';
  renderHeader();
  for(var i = 0; i < allPlayers.length; i++) {
    allPlayers[i].render();
  }
}

newPlayer.addEventListener('submit', handleSubmit);

renderTable();
