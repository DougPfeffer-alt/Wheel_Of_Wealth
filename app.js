'use strict';
var newPlayer = document.getElementById('newPlayer');
var userName = 'username';


// console.log(newPlayer);
function handleSubmit(event) {
  event.preventDefault();
  userName = event.target.name.value;
  userName = JSON.stringify(userName);
  console.log(event.target.name.value);
  localStorage.setItem('userName', userName);
  newPlayer.removeEventListener('submit', handleSubmit);
  // location.replace('game.html');
  window.location = 'game.html';
}
newPlayer.addEventListener('submit', handleSubmit);





