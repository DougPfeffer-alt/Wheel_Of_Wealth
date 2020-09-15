'use strict';
var newPlayer = document.getElementById('newPlayer');


//global var here
var tableBody = document.getElementById('highScoreTable');
var headerPlayer = document.createElement('th');
var headerScore = document.createElement('th');
// var placement = [];
var allPlayers = [];
var hiScoreArray = [];

function renderTable() {
  if (localStorage.getItem('hiScoreArray')) {
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
    for(var i = 0; i < hiScoreArray.length; i++){
      var tempName = ' ';
      var tempScore = 0;
      tempName = hiScoreArray[i].name;
      tempScore = hiScoreArray[i].score;
      new Player(tempName, tempScore);
    }
  } else {
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
    allPlayers.pop();
  }
  hiScoreArray = JSON.stringify(allPlayers);
  localStorage.setItem('hiScoreArray', hiScoreArray);

  renderHeader();
  for (var k = 0; k < allPlayers.length; k++) {
    allPlayers[k].render();
  }
}

function renderHeader() {
  var headerRow = document.createElement('tr');
  headerScore.textContent = 'PLAYER';
  headerPlayer.textContent = 'SCORE';
  headerRow.appendChild(headerScore);
  headerRow.appendChild(headerPlayer);
  tableBody.appendChild(headerRow);
}

var userMakesHSList = function(name, score) {
  hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
  var newHighScore = new Player(name, score);
  hiScoreArray.push(newHighScore);
  hiScoreArray = JSON.stringify(allPlayers);
  localStorage.setItem('hiScoreArray', hiScoreArray);

  if(allPlayers.length > 10){
    allPlayers.pop();
  }
};

function Player(name, score) {
  this.name = name;
  this.score = score;
  allPlayers.push(this);
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

renderTable();
