'use strict';

var hiScoreArray = [];

function HiScoree(name, score) {
  this.name = name;
  this.score = score;
  hiScoreArray.push(this);
}

function userMakesHSList(name, score) {
  //adds new user score to array
  new HiScoree(name, score);

  //if there is already a hi score array in local storage, use that one instead
  if (localStorage.getItem('hiScoreArray')) {
    //parses the stringified data back to an array type object
    hiScoreArray = JSON.parse(localStorage.getItem('hiScoreArray'));
  }
  //if there is nothing in local storage, the default hi score list is loaded instead
  else {
    new HiScoree('Nebiyu', 100);
    new HiScoree('Doug', 90);
    new HiScoree('Louis', 80);
    new HiScoree('Mike', 70);
    new HiScoree('Paully', 60);
    new HiScoree('JakeTown', 50);
    new HiScoree('Bob', 40);
    new HiScoree('Carol', 30);
    new HiScoree('Alice', 20);
    new HiScoree('Ted', 10);
  }

  //sorts function from lowest score to highest score
  hiScoreArray.sort(function (a, b) { return a.score - b.score;});

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
var highScore = document.getElementById('highScoreTable');

function renderHeader() {
  var 
}