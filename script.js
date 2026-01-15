let secret = Math.floor(Math.random() * 100) + 1;

function singleGuess() {
  const input = document.getElementById("singleInput");
  const msg = document.getElementById("singleMsg");
  const guess = Number(input.value);

  if (!guess) return;

  if (guess < secret) msg.textContent = "Too low!";
  else if (guess > secret) msg.textContent = "Too high!";
  else msg.textContent = "🎉 You win!";

  input.value = "";
  input.focus();
}

function resetSingle() {
  secret = Math.floor(Math.random() * 100) + 1;
  singleMsg.textContent = "";
  singleInput.value = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && singleGame.style.display === "block") {
    singleGuess();
  }
});
