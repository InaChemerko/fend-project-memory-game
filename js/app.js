/*
 * Create a list that holds all of your cards
 */
const cardsList = document.getElementsByClassName('card');
let cards = Array.from(cardsList);
const deck = document.getElementsByClassName('deck');
let cardsOpen = []; //array for open cards
let cardsMatch = []; //array for match cards
let movesCounter = 0;
const moves = document.getElementsByClassName('moves');
const time = document.getElementById('time');
const restart = document.getElementsByClassName('restart');
let seconds = 0;
let minutes = 0;
let setTime;
const stars = document.getElementsByClassName('stars')[0].getElementsByTagName('li');
const modal=document.getElementsByClassName('modal');
const modalHeading = document.getElementById('modal-heading');
const resetButton = document.getElementById('playAgain');
let message;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/* ready to play */
document.addEventListener("DOMContentLoaded", play);

let shuffledCards=[];
 
 /* add an event listener  to "reset" button */
restart[0].addEventListener('click',function (){
  resetGame();
}); 

/* restart the new game */
function resetGame(){
  if (deck[0].classList.contains('hide')){ 
    deck[0].classList.remove('hide'); //remove the lock deck
  };
  seconds = 0;
  minutes = 0;
  clearInterval(setTime);
  time.innerHTML = `<time id = "time">${minutes}:${seconds}</time>`; //reset timer
  play();
let resetCards = document.querySelectorAll('.deck li');
resetCards.forEach(function(card){
  card.classList = 'card';  
});
 stars[1].classList.remove('loose'); //remove the transparency from the stars
 stars[2].classList.remove('loose');
 modal[0].style.display ='none'; // remove modal with congratulations
 for (let card of shuffledCards){
  card.classList.remove('open'); 
  card.classList.remove('show'); 
  card.classList.remove('match');
 };
 cardsMatch = [];
 cardsOpen = [];
}

resetButton.addEventListener('click', function(){
  resetGame(); //add an event listener  to "play again" button
});

/* start to play */
function play(){
  deck[0].innerHTML = '';
  shuffledCards = shuffle(cards);
  for (let card of shuffledCards){
    card.addEventListener("click", display);
    deck[0].appendChild(card);
  }
  
  movesCounter = 0;
  showMovs(movesCounter);
} 

  function showMovs(count){
    moves[0].innerText = count; //display the moves
   }
 
 /* display cards */
 function display (event) {
    if (!cardsOpen.includes(event.target) && !cardsMatch.includes(event.target)) {
   if (cardsOpen.length < 2){
     event.target.classList.add('open');
     event.target.classList.add('show');
     cardsOpen.push(event.target);
     };
   if (cardsOpen.length === 2) {
      check();
   };
 } else{
     return;
   }

   movesCounter++;
      checkStars();
   showMovs(movesCounter); 
   if (movesCounter === 1) {
     beginningTime();
   }
   if (cardsMatch.length === cards.length){
        gameOver(); 
      };
   
   };
  

/* check for matching */
   function check(){
  if (cardsOpen[0].dataset.card === cardsOpen[1].dataset.card) {
    cardsOpen[0].classList.add('match'); 
    cardsOpen[1].classList.add('match');
    cardsMatch.push(cardsOpen[0]);
    cardsMatch.push(cardsOpen[1]);
    cardsOpen = [];
     } else {
    setTimeout(function(){
       cardsOpen[0].classList.remove('open'); 
       cardsOpen[0].classList.remove('show');
       cardsOpen[1].classList.remove('open');
       cardsOpen[1].classList.remove('show');
       cardsOpen = [];
  }, 1000);
  };
  }

/* start the timer */
function beginningTime(){
  setTime = setInterval(function (){
    seconds++;
     if (seconds === 60) {
      seconds = 0;
      minutes++
    };
    time.innerHTML = `<time id = "time"> ${minutes}:${seconds} </time>`;
   }, 1000);
  
};
 
 /* finish the game when all cards matched */
function gameOver() {
  deck[0].classList.add('hide'); //block the deck
  clearInterval(setTime);
  congratulations();
};
 
 /* change star rating */
function checkStars(){
  if(movesCounter == 18){
     stars[2].classList.add('loose');
     }
  
  if(movesCounter == 40){
     stars[1].classList.add('loose');
     }
 } 

/* display model */
function congratulations(){
if(message){
    modalHeading.removeChild(message);
  };

message = document.createElement('p');
  message.innerHTML = '<p>Time:  ' +
    time.textContent +
    '<br>  Moves:  ' +
    movesCounter + 
    '<br>  Stars: ' +
    stars[0].parentNode.outerHTML +
    '</p>';
  modalHeading.appendChild(message);
  modal[0].style.display ='block';
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
