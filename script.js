/* script.js
  Number Guessing Game
  Demonstrates: variables, types, structures, functions,
  event listeners, DOM manipulation, loops, and comments.
*/

(function() {
  // Configuration (variables & constants)
  var MIN = 1;                      
  var MAX = 100;                    
  var MAX_ATTEMPTS = 7;             

  // Game state (object used as a simple structure)
  var gameState = {
    secret: null,
    attemptsLeft: MAX_ATTEMPTS,
    guesses: []                      // store previous guesses
  };

  // Query DOM elements
  var minSpan = document.getElementById('min');
  var maxSpan = document.getElementById('max');
  var attemptsSpan = document.getElementById('attempts');
  var guessInput = document.getElementById('guessInput');
  var guessBtn = document.getElementById('guessBtn');
  var resetBtn = document.getElementById('resetBtn');
  var feedback = document.getElementById('feedback');
  var guessesList = document.getElementById('guessesList');

  // Initialize UI and game
  function init() {
    minSpan.textContent = MIN;
    maxSpan.textContent = MAX;
    attemptsSpan.textContent = MAX_ATTEMPTS;
    resetGame();
    // Event listeners
    guessBtn.addEventListener('click', onGuess);
    resetBtn.addEventListener('click', resetGame);
    // allow Enter key to submit
    guessInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { onGuess(); }
    });
  }

  // Generate random integer between min and max (inclusive)
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Reset game state and UI
  function resetGame() {
    gameState.secret = randomInt(MIN, MAX);
    gameState.attemptsLeft = MAX_ATTEMPTS;
    gameState.guesses = [];
    attemptsSpan.textContent = gameState.attemptsLeft;
    feedback.textContent = 'Game reset. Good luck!';
    guessesList.innerHTML = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    console.log('Secret number (for debugging):', gameState.secret);
  }

  // Validate input (string -> number) and return parsed integer or null
  function parseGuess(value) {
    var n = parseInt(value, 10);
    if (isNaN(n)) { return null; }
    return n;
  }

  // Handle a guess event
  function onGuess() {
    var raw = guessInput.value.trim();
    var guess = parseGuess(raw);

    if (guess === null) {
      feedback.textContent = 'Please enter a valid number.';
      return;
    }

    if (guess < MIN || guess > MAX) {
      feedback.textContent = `Please choose a number between ${MIN} and ${MAX}.`;
      return;
    }

    // record guess
    gameState.guesses.push(guess);
    addGuessToList(guess);

    // check guess
    if (guess === gameState.secret) {
      feedback.textContent = `🎉 Correct! You guessed the number ${gameState.secret}.`;
      endGame(true);
      return;
    }

    // decrement attempts and update
    gameState.attemptsLeft -= 1;
    attemptsSpan.textContent = gameState.attemptsLeft;

    // give hint
    if (guess < gameState.secret) {
      feedback.textContent = 'Too low! Try a higher number.';
    } else {
      feedback.textContent = 'Too high! Try a lower number.';
    }

    // check if out of attempts
    if (gameState.attemptsLeft <= 0) {
      feedback.textContent = `Game over — the secret number was ${gameState.secret}.`;
      endGame(false);
    }

    // clear input for next try
    guessInput.value = '';
    guessInput.focus();
  }

  // Add a guess to the visible list
  function addGuessToList(number) {
    var li = document.createElement('li');
    li.textContent = number;
    guessesList.appendChild(li);
  }

  // End game: disable input and show final state
  function endGame(won) {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    if (won) {
      feedback.textContent += ' Well done!';
    } else {
      feedback.textContent += ' Try again by pressing Reset.';
    }
  }

  // Start the game on load
  init();

})();
