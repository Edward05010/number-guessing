import { db, ref, set, get, update, onValue } from "./firebase.js";

let roomCode = "";
let player = 0;
let gameOver = false;

function genCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

window.createRoom = async () => {
  roomCode = genCode();
  player = 1;

  await set(ref(db, "rooms/" + roomCode), {
    secret: Math.floor(Math.random() * 100) + 1,
    turn: 1,
    lastGuess: null,
    lastResult: "",
    winner: null,
    status: "playing"
  });

  enterGame();
};

window.joinRoom = async () => {
  const code = roomInput.value.trim().toUpperCase();
  if (!code) return;

  const snap = await get(ref(db, "rooms/" + code));
  if (!snap.exists()) return alert("Room not found");

  roomCode = code;
  player = 2;
  enterGame();
};

function enterGame() {
  lobby.classList.add("hidden");
  game.classList.remove("hidden");
  roomCodeText.textContent = "Room: " + roomCode;

  const roomRef = ref(db, "rooms/" + roomCode);

  onValue(roomRef, snap => {
    const d = snap.val();
    if (!d) return;

    if (d.lastGuess !== null) {
      message.textContent =
        `Player ${d.turn === 1 ? 2 : 1} guessed ${d.lastGuess} → ${d.lastResult}`;
    }

    if (d.winner) {
      gameOver = true;
      message.textContent = `🏆 Player ${d.winner} WON!`;

      showEndOptions();
      return;
    }

    turnText.textContent = d.turn === player ? "Your turn" : "Opponent's turn";
  });
}

window.makeGuess = async () => {
  if (gameOver) return;

  const g = Number(guessInput.value);
  if (!g) return;

  const roomRef = ref(db, "rooms/" + roomCode);
  const data = (await get(roomRef)).val();

  if (data.turn !== player) return alert("Not your turn");

  let result = "";

  if (g < data.secret) result = "Too low";
  else if (g > data.secret) result = "Too high";
  else {
    await update(roomRef, {
      winner: player,
      lastGuess: g,
      lastResult: "Correct",
      status: "finished"
    });
    return;
  }

  await update(roomRef, {
    lastGuess: g,
    lastResult: result,
    turn: data.turn === 1 ? 2 : 1
  });

  guessInput.value = "";
};

function showEndOptions() {
  const controls = document.createElement("div");
  controls.id = "endControls";

  controls.innerHTML = `
    <button onclick="playAgain()">Play Again</button>
    <button onclick="leaveRoom()">Quit</button>
  `;

  game.appendChild(controls);
}

window.playAgain = async () => {
  const roomRef = ref(db, "rooms/" + roomCode);

  await update(roomRef, {
    secret: Math.floor(Math.random() * 100) + 1,
    turn: 1,
    lastGuess: null,
    lastResult: "",
    winner: null,
    status: "playing"
  });

  gameOver = false;

  const controls = document.getElementById("endControls");
  if (controls) controls.remove();

  message.textContent = "";
};

window.leaveRoom = async () => {
  if (!roomCode) return;

  const roomRef = ref(db, "rooms/" + roomCode);

  if (player === 1) {
    await set(roomRef, null);
  }

  roomCode = "";
  player = 0;
  gameOver = false;

  lobby.classList.remove("hidden");
  game.classList.add("hidden");

  message.textContent = "";
  turnText.textContent = "";
  roomInput.value = "";

  const controls = document.getElementById("endControls");
  if (controls) controls.remove();
};


document.addEventListener("keydown", (e) => {
  const gameDiv = document.getElementById("game");

  if (
    e.key === "Enter" &&
    gameDiv &&
    !gameDiv.classList.contains("hidden")
  ) {
    makeGuess();
  }
});

