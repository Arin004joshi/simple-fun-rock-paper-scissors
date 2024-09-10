// CONVERTS STRING INTO OBJECT
let score = JSON.parse(localStorage.getItem('score')) || {
  countWin:0,
  countLoss:0,
  countTie:0
};

// if (score === null){
//   score = {
//     countWin:0,
//     countLoss:0,
//     countTie:0
//   }
// }

//Event-Listener : Works similar to "onClick" attribute
document.querySelector('.js-rock-button')
  .addEventListener('click',()=>{
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click',()=>{
    playGame('paper');
  });  

document.querySelector('.js-scissors-button')
  .addEventListener('click',()=>{
    playGame('scissors');
  });
  
document.querySelector('.js-reset-button')
  .addEventListener('click',()=>{
    score.countWin=0;
    score.countLoss=0;
    score.countTie=0;
    localStorage.removeItem('score');
    updateScore();
  });

document.querySelector('.js-autoplay-button')
  .addEventListener('click',()=>{
    autoPlay();
  });


////////////Playing with the keyboard///////////
document.body.addEventListener('keydown',(event)=>{
  if (event.key==='r') {
    playGame('rock');
  }else if (event.key==='p') {
    playGame('paper');
  }else if (event.key==='s') {
    playGame('scissors');
  }else if (event.key==='a') {
    autoPlay();
  }else if (event.key==='z') {
    score.countWin=0;
    score.countLoss=0;
    score.countTie=0;
    localStorage.removeItem('score');
    updateScore();
  }
})


//////////////////////////////////////////////// 

function playGame(pickYourMove) {  
let computerMove = pickComputerMove(); 
let result = '';
if (pickYourMove === 'scissors') {
  if (computerMove === 'rock') {
  result = `You lose`;
}else if (computerMove === 'paper') {
  result = `You win`;
}else{
  result = `You tie`;
}

}else if (pickYourMove === 'rock') {
  if (computerMove === 'rock') {
  result = `You tie`;
}else if (computerMove === 'paper') {
  result = `You lose`;
}else{
  result = `You win`;
}

}else{
  if (computerMove === 'rock') {
  result = `You win`;
}else if (computerMove === 'paper') {
  result = `You tie`;
}else{
  result = `You lose`;
}
}

if (result === 'You win') {
  score.countWin+=1;
}else if (result === 'You lose') {
  score.countLoss+=1;
}else{
  score.countTie+=1;
}

// CONVERTS OBJECT INTO STRING
localStorage.setItem('score',JSON.stringify(score));

updateScore();

//to display the result
document.querySelector('.js-result').innerHTML = result;

//to display the moves
document.querySelector('.js-moves').innerHTML = `you
<img src="images/${pickYourMove}-emoji.png" class="move-icon" alt="">
<img src="images/${computerMove}-emoji.png" class="move-icon" alt="">
computer`;
}

///////////////////////////////////////////////

//to display scores in the web page
function updateScore() {
document.querySelector('.js-score').innerHTML = `Wins: ${score.countWin}.  Losses: ${score.countLoss}.  Ties: ${score.countTie}`;
}

///////////////////////////////////////////////

function pickComputerMove() {
  let computerMove = ``;
  const random = Math.random();

  if (random>=0 && random<1/3) {
    computerMove = `rock`;
  }else if (random>=1/3 && random<2/3) {
    computerMove = `paper`;
  }else{
    computerMove = `scissors`;
  }
  return computerMove;
}

///////////////////////////////////////////////

let isautoPlaying = false;
let intervalID;

//Provides Hoisting.
function autoPlay() {
  if (!isautoPlaying) {
    intervalID = setInterval(() => {
      const pickYourMove = pickComputerMove();
      playGame(pickYourMove);
    },1000);
    isautoPlaying=true;
    document.querySelector('.autoplay-button').innerText = 'Stop Play';
  }else{
    clearInterval(intervalID);
    document.querySelector('.autoplay-button').innerText = 'Auto Play';
    isautoPlaying=false;
  }
}