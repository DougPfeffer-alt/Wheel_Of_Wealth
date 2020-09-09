'use strict';

var categoryArray = ['Sports', 'JavaScript', 'CSS'];
var sportsArray = ['function', 'variable', 'concatenation'];
var javaScriptArray = ['function', 'variable', 'concatenation'];
var cssArray = ['function', 'variable', 'concatenation'];

var currentRoundArray = [];
var currentCategory;
var currentWord;
var userName;

function clicksBegin(){  
  if(userName === undefined){    
    console.log('go to name input'); 
    //var submitButtton = document.getElementById('submitButton');
    //submitButton.addEventListener('submit', gameStart());   
  }
  else{
    console.log('game starts with current userName');
  }
}

function gameStart(e){
  console.log('Display Game Intro!');
  return createGameboard();
}

function mathRand(max) {
  return Math.floor(Math.random() * max);
}

function createGameboard(){
  //1. select category
  currentCategory = categoryArray[mathRand(categoryArray.length)];

  //2. select hidden word
  if(currentCategory === 'Sports'){
    currentWord = sportsArray[mathRand(sportsArray.length)];
  }else if(currentCategory === 'JavaScript'){
    currentWord = javaScriptArray[mathRand(javaScriptArray.length)];
  }else if(currentCategory === 'CSS'){
    currentWord = cssArray[mathRand(cssArray.length)];
  }
return splitString(currentWord);  
}

function splitString(currWord){
  str = currWord;
  currWordArray = str.split('');
  return populateGameboard(currentRoundArray);
}

