// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// GAME
const gameBtn = document.getElementById('gameBtn');
const gameModal = document.getElementById('gameModal');
const closeGame = document.getElementById('closeGame');
const startGameBtn = document.getElementById('startGame');

let p1, p2, p1Pos, p2Pos, gameActive;

// Open modal
gameBtn.addEventListener('click', () => {
  gameModal.style.display = 'flex';
  // Initialize DOM references after modal is in DOM
  p1 = document.getElementById("p1");
  p2 = document.getElementById("p2");
  resetGame();
});

// Close modal
closeGame.addEventListener('click', () => {
  gameModal.style.display = 'none';
  gameActive = false;
});

// Reset/start game
startGameBtn.addEventListener('click', resetGame);

function resetGame() {
  if (!p1 || !p2) return; // avoid errors if modal not open
  p1Pos = 100;
  p2Pos = 650;
  p1.style.background = "red";
  p2.style.background = "blue";
  updatePositions();
  gameActive = true;
  document.getElementById("status").textContent = 
      "Player 1: A/D to move, W to attack | Player 2: ←/→ to move, ↑ to attack";
}

// Movement & attack
document.addEventListener("keydown", e => {
  if (!gameActive) return;

  switch (e.key) {
    // Player 1
    case "a": p1Pos = Math.max(0, p1Pos - 20); break;
    case "d": p1Pos = Math.min(750, p1Pos + 20); break;
    case "w": attack(p1, p2, p1Pos, p2Pos); break;

    // Player 2
    case "ArrowLeft": p2Pos = Math.max(0, p2Pos - 20); break;
    case "ArrowRight": p2Pos = Math.min(750, p2Pos + 20); break;
    case "ArrowUp": attack(p2, p1, p2Pos, p1Pos); break;
  }
  updatePositions();
});

function updatePositions() {
  p1.style.left = p1Pos + "px";
  p2.style.left = p2Pos + "px";
}

function attack(attacker, defender, attPos, defPos) {
  attacker.classList.add("attack");
  setTimeout(() => attacker.classList.remove("attack"), 200);

  if (Math.abs(attPos - defPos) < 60) {
    defender.style.background = "gray";
    setTimeout(() => defender.style.background = defender.id === "p1" ? "red" : "blue", 500);
  }
}
