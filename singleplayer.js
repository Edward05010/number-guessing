let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function singleGuess() {
  const input = document.getElementById("singleInput");
  const msg = document.getElementById("singleMsg");
  const attemptText = document.getElementById("singleAttempts");

  const guess = Number(input.value);
  if (!guess) return;

  attempts++;

  if (guess < secret) {
    msg.textContent = "📉 Too low";
  }
  else if (guess > secret) {
    msg.textContent = "📈 Too high";
  }
  else {
    msg.textContent = "🎉 You win!";
    attemptText.textContent = `You guessed it in ${attempts} attempts`;
  }

  attemptText.textContent = `Attempts: ${attempts}`;

  input.value = "";
  input.focus();
}

function resetSingle() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  singleMsg.textContent = "";
  singleAttempts.textContent = "";
  singleInput.value = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && !document.getElementById("singleGame").classList.contains("hidden")) {
    singleGuess();
  }
});
