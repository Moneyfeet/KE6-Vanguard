// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// GAME
// Elements
const gameBtn = document.getElementById('gameBtn');
const gameModal = document.getElementById('gameModal');
const closeGame = document.getElementById('closeGame');

let p1, p2, p1Health, p2Health;
let p1Pos, p2Pos, gameActive;
let p1Y = 0, isJumping = false;
const maxHealth = 100;
let p1CurrentHealth, p2CurrentHealth;

// Open modal
gameBtn.addEventListener('click', () => {
  gameModal.style.display = 'flex';
  p1 = document.getElementById("p1");
  p2 = document.getElementById("p2");
  p1Health = document.getElementById("p1-health");
  p2Health = document.getElementById("p2-health");
  startGame();
});

// Close modal
closeGame.addEventListener('click', () => {
  gameModal.style.display = 'none';
  gameActive = false;
});

function startGame() {
  p1Pos = 100;
  p2Pos = 650;
  p1Y = 0;
  isJumping = false;
  p1CurrentHealth = maxHealth;
  p2CurrentHealth = maxHealth;
  updateHealthBars();
  updatePositions();
  gameActive = true;

  // AI interval
  if (window.aiInterval) clearInterval(window.aiInterval);
  window.aiInterval = setInterval(aiMove, 400);

  document.getElementById("status").textContent =
    "Player 1: A/D to move, W to attack, Space to jump";
}

// Update positions of fighters
function updatePositions() {
  p1.style.left = p1Pos + "px";
  p2.style.left = p2Pos + "px";
  p1.style.bottom = p1Y + "px";
}

// Update health bars width and color
function updateHealthBars() {
  const p1Pct = p1CurrentHealth / maxHealth;
  const p2Pct = p2CurrentHealth / maxHealth;

  p1Health.style.width = (200 * p1Pct) + "px";
  p2Health.style.width = (200 * p2Pct) + "px";

  p1Health.style.background = p1Pct > 0.6 ? "green" : p1Pct > 0.3 ? "yellow" : "red";
  p2Health.style.background = p2Pct > 0.6 ? "green" : p2Pct > 0.3 ? "yellow" : "red";
}

// Player controls
document.addEventListener("keydown", e => {
  if (!gameActive) return;

  switch (e.key) {
    case "a": p1Pos = Math.max(0, p1Pos - 20); break;
    case "d": p1Pos = Math.min(750, p1Pos + 20); break;
    case "w": attack("p1"); break;
    case " ": jump(); break; // spacebar
  }
  updatePositions();
});

// Jump logic
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 0;
  const jumpUp = setInterval(() => {
    if (jumpHeight >= 120) {
      clearInterval(jumpUp);
      const fall = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(fall);
          isJumping = false;
        }
        jumpHeight -= 10;
        p1Y = Math.max(0, jumpHeight);
        updatePositions();
      }, 40);
    }
    jumpHeight += 10;
    p1Y = jumpHeight;
    updatePositions();
  }, 40);
}

// AI behavior
function aiMove() {
  if (!gameActive) return;

  // Simple AI: move towards player
  if (p2Pos > p1Pos + 50) p2Pos -= 15;
  else if (p2Pos < p1Pos - 50) p2Pos += 15;
  else if (Math.random() < 0.4) attack("p2"); // attack 40% chance if close

  updatePositions();
}

// Attack function
function attack(attackerId) {
  const attacker = attackerId === "p1" ? p1 : p2;
  let defenderCurrentHealth = attackerId === "p1" ? p2CurrentHealth : p1CurrentHealth;

  attacker.classList.add("attack");
  setTimeout(() => attacker.classList.remove("attack"), 200);

  // Collision only if not jumping over
  if (Math.abs(p1Pos - p2Pos) < 60 && (attackerId === "p2" || p1Y < 50)) {
    defenderCurrentHealth -= 10;

    if (attackerId === "p1") p2CurrentHealth = defenderCurrentHealth;
    else p1CurrentHealth = defenderCurrentHealth;

    updateHealthBars();

    if (defenderCurrentHealth <= 0) {
      gameActive = false;
      clearInterval(window.aiInterval);
      alert(attackerId === "p1" ? "You Win!" : "AI Wins!");
    }
  }
}
