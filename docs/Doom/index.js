function launchDoom() {
    const container = document.getElementById("doom-container");
    container.style.display = "block"; // show canvas

    // Initialize Doom engine
    if (typeof Doom !== "undefined") {
        Doom.init(container); // or Doom.start(container) depending on your engine
    } else {
        console.error("Doom engine not loaded!");
    }
}

const gameBtn = document.getElementById("gameBtn");
if (gameBtn) {
    gameBtn.addEventListener("click", launchDoom);
}
