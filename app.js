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

function userMakesHSList(name, score) {
  new Player(name, score);
  if (localStorage.getItem('playerArray')) {
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
  } else {
    new Player('Nebiyu', '$100');
    new Player('Doug', '$90');
    new Player('Louis', '$80');
    new Player('Mike', '$70');
    new Player('Paully', '$60');
    new Player('JakeTown', '$50');
    new Player('Bob', '$40');
    new Player('Carol', '$30');
    new Player('Alice', '$20');
    new Player('Ted', '$10');
  }
  hiScoreArray.sort(function (a, b) { return a.score - b.score; });

}

console.log(hiScoreArray);

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


userMakesHSList();
renderTable();

function Player(name, score) {
  this.name = name;
  this.score = score;
  allPlayers.push(this);
}

newPlayer.addEventListener('submit', handleSubmit);

renderTable();
console.log(allPlayers);


