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



