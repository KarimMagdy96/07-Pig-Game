'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const btnNew = document.querySelector('.btn--new');
const cuurent0El = document.querySelector('#current--0');
const cuurent1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, gamePlaying;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  gamePlaying = true;
  cuurent0El.textContent = 0;
  cuurent1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.remove('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling the dice fun
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    //generate  a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // dispaly dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // 1 is not counted as a dice
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch next player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    //add current score to current player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score is <=100
    if (scores[activePlayer] >= 100) {
      //finish game
      gamePlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});
newGame.addEventListener('click', init);
