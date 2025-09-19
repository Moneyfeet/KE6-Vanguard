// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// GAME
const gameBtn = document.getElementById('gameBtn');
const gameModal = document.getElementById('gameModal');
const closeGame = document.getElementById('closeGame');
const startGameBtn = document.getElementById('startGame');

let p1, p2, p1Health, p2Health;
let p1Pos, p2Pos, gameActive;
const maxHealth = 100;
let p1CurrentHealth, p2CurrentHealth;

// Open modal
gameBtn.addEventListener('click', () => {
   console.log("Game button clicked! Opening modal..."); // Debug message
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

// Start/reset game
startGameBtn.addEventListener('click', startGame);

function startGame() {
  p1Pos = 100;
  p2Pos = 650;
  p1CurrentHealth = maxHealth;
  p2CurrentHealth = maxHealth;
  p1Health.style.width = "50px";
  p2Health.style.width = "50px";
  p1.style.background = "red";
  p2.style.background = "blue";
  updatePositions();
  gameActive = true;
  document.getElementById("status").textContent =
      "Player 1: A/D to move, W to attack | Player 2: ←/→ to move, ↑ to attack";
}

// Key controls
document.addEventListener("keydown", e => {
  if (!gameActive) return;
  switch (e.key) {
    case "a": p1Pos = Math.max(0,p1Pos-20); break;
    case "d": p1Pos = Math.min(750,p1Pos+20); break;
    case "w": attack(p1, p2, "p2"); break;
    case "ArrowLeft": p2Pos = Math.max(0,p2Pos-20); break;
    case "ArrowRight": p2Pos = Math.min(750,p2Pos+20); break;
    case "ArrowUp": attack(p2, p1, "p1"); break;
  }
  updatePositions();
});

function updatePositions() {
  p1.style.left = p1Pos + "px";
  p2.style.left = p2Pos + "px";
}

function attack(attacker, defenderId, defenderHealthId) {
  attacker.classList.add("attack");
  setTimeout(()=>attacker.classList.remove("attack"),200);

  const distance = Math.abs(p1Pos - p2Pos);
  if(distance<60) {
    if(defenderId==="p1") {
      p1CurrentHealth -= 10;
      p1Health.style.width = (50*p1CurrentHealth/maxHealth)+"px";
      if(p1CurrentHealth<=0){gameActive=false; alert("Player 2 Wins!");}
    } else {
      p2CurrentHealth -= 10;
      p2Health.style.width = (50*p2CurrentHealth/maxHealth)+"px";
      if(p2CurrentHealth<=0){gameActive=false; alert("Player 1 Wins!");}
    }
  }
}
