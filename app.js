'use strict';


//global var here
var newPlayer = document.getElementById('newPlayer');
var tableBody = document.getElementById('highScoreTable');
var headerPlayer = document.createElement('th');
var headerScore = document.createElement('th');
// var placement = [];
var allPlayers = [];
var hiScoreArray = [];

//Random Math
// function getRandomIntInclusive(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;

// }
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//constructor functions
// function Player(name) {
//   this.name = name;
//   this.totalScore = [];
//   allPlayers.push(this);
// }
// console.log(allPlayers);
// //how we push the high score highScore arry
// function HiScore(name, score) {
//   this.name = name;
//   this.score = score;
//   hiScoreArray.push(this);
// }

// Player.prototype.render = function () {


Player.prototype.render = function () {
  // var highScoreTableEl = document.createElement('th');
  // highScoreTable.textContent = this.name;
  // var trEl = document.createElement('tr');
  // tableEl.appendChild(trEl);
  // var thEl = document.createElement('th');
  // thEl.textContent = this.name;
  // trEl.appendChild(thEl);
  var playerRow = document.createElement('tr');
  var scoreRow = document.createElement('tr');
  var highScoreName = document.createElement('th');
  highScoreName.className = 'hiscoreTh';
  var highScore = document.createElement('th');
  highScore.className = 'hiscoreCell';
  highScoreName.textContent = this.name;
  // tableEl.appendChild(playerRow);
  highScore.textContent = this.score;
  scoreRow.appendChild(highScore);
  playerRow.appendChild(highScoreName);
  playerRow.appendChild(scoreRow);
  tableBody.appendChild(playerRow);
};

function userMakesHSList(name, score) {
  //adds new user score to array
  // new HiScore(name, score);
  new Player(name, score);


  //if there is already a hi score array in local storage, use that one instead
  // if (localStorage.getItem('hiScoreArray')) {
  if (localStorage.getItem('playerArray')) {
    //parses the stringified data back to an array type object
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
  } else {
    //   new HiScore('Nebiyu', 100);
    //   new HiScore('Doug', 90);
    //   new HiScore('Louis', 80);
    //   new HiScore('Mike', 70);
    //   new HiScore('Paully', 60);
    //   new HiScore('JakeTown', 50);
    //   new HiScore('Bob', 40);
    //   new HiScore('Carol', 30);
    //   new HiScore('Alice', 20);
    //   new HiScore('Ted', 10);
    // };
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

  //sorts function from lowest score to highest score
  hiScoreArray.sort(function (a, b) { return a.score - b.score; });
  // @@ -70, 56 + 62, 84 @@function userMakesHSList(name, score) {

}

//this function will be the last thing called after the game is over, creating the hi score list.
// userMakesHSList('MKG', 1000);
// userMakesHSList('MKG', 1000);

//console debug
console.log(hiScoreArray);

//table

// function handleSubmit() {
// function handleSubmit(event) {
//   event.preventDefault();
//   console.log("work");
//   newPlayer = event.target.name.value;
//   new Player(name);
//   // tableBody.innerHTML = '';
//   // event.target.name.value = null;
//   console.log(event.target.name);
//   renderTable();


// }

function handleSubmit(event) {
  event.preventDefault();
  return (event.target.name.value);

}


// newPlayer = event.target.playerName.value;
// newPlayer = new Player(playerName);
// event.target.playerName.value = null;
// renderTable();



// asking user their name and logging it in local storage
// maybe using a form we will ask the user- name and info

//render the table with the high score
function renderTable() {

  renderHeader();
  for (var i = 0; i < allPlayers.length; i++) {
    allPlayers[i].render();
  }
}

// var tableBody = document.getElementById('highScoreTable');
// newPlayer.addEventListener('submit', handleSubmit);

// constructor functions
function renderHeader() {
  var headerRow = document.createElement('tr');

  // headerScore.textcontent = 'Score';
  // headerRow.appendChild(headerPlayer);
  // tableBody.appendChild(headerRow);
  headerScore.textContent = 'PLAYER';
  headerPlayer.textContent = 'SCORE';
  console.log(headerScore);

  // for (var i = 0; i < placement.length; i++) {
  //   var headerPlacement = document.createElement('th');
  //   headerPlacement.textContent = 'WORDS';
  //   // headerScore.appendChild(headerPlacement);
  //   // headerRow.appendChild(headerPlacement);
  //   headerPlayer.appendChild(headerPlacement);
  // }
  headerRow.appendChild(headerScore);
  headerRow.appendChild(headerPlayer);
  tableBody.appendChild(headerRow);
}


userMakesHSList();
renderTable();

// asking user their name and logging it in local storage
// maybe using a form we will ask the user- name and info

//render the table with the high score
// function renderTable() {
//   // table.innerHTML = '';
//   renderHeader();
//   for (var i = 0; i < allPlayers.length; i++) {
//     allPlayers[i].render();
//   }
// function Player(name) {
//   this.name = name;
//   this.totalScore = [];
//   allPlayers.push(this);
// }
// console.log(allPlayers);
//how we push the high score highScore arry
function Player(name, score) {
  this.name = name;
  this.score = score;
  // hiScoreArray.push(this.score);
  allPlayers.push(this);
}

newPlayer.addEventListener('submit', handleSubmit);

renderTable();
console.log(allPlayers);









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



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}