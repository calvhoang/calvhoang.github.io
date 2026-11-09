let randomNumber;
let attempts = 0;
let feedback = document.querySelector("#feedback")
let playerGuess = document.querySelector("#playerGuess");
let guessBtn = document.querySelector("#guessBtn");
let resetBtn = document.querySelector("#resetBtn");
let attemptsLeft = document.querySelector("#attempts");

let win = 0;
let lose = 0;
let wins = document.querySelector("#wins");
let losses = document.querySelector("#losses");

document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   resetBtn.style.display = "none";

   guessBtn.disabled = false;

   playerGuess.focus();
   playerGuess.value = "";
   feedback.textContent = "";
   attemptsLeft.textContent = "7"

   guessBtn.addEventListener("click", checkGuess);

   document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
   feedback.textContent = "";
   let guess = playerGuess.value
   console.log("Player Guess: " + guess);

   if (guess < 1 || guess > 99) {
      feedback.textContent = "Enter a number between 1 and 99"
      feedback.style.color = "red";
      return;
   }

   attempts++;
   attemptsLeft.textContent = 7 - attempts;

   if (guess == randomNumber) {
      feedback.textContent = "You guessed it! You won!"
      feedback.style.color = "#96fd7e";
      win++;
      gameOver();
   } else {
      document.querySelector("#guesses").textContent += guess + " ";

      if (attempts == 7) {
         feedback.textContent = "Sorry, you lost!"
         feedback.style.color = "#ff9595";
         lose++;
         gameOver();
      } else if (guess > randomNumber) {
         feedback.textContent = "Guess was high"
         feedback.style.color = "#7aadff";
      } else {
         feedback.textContent = "Guess was low"
         feedback.style.color = "#7aadff";
      }
   }
}

function gameOver() {
   guessBtn.disabled = true;
   resetBtn.style.display = "inline";
   wins.textContent = win;
   losses.textContent = lose;
}