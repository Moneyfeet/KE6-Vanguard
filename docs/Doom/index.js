document.getElementById("gameBtn").addEventListener("click", () => {
	const container = document.getElementById("doom-container");
	container.style.display = "block"; // show canvas

	// Initialize Doom engine
	if (typeof Doom !== "undefined") {
		Doom.init(container); // or Doom.start(container) depending on engine
	} else {
		console.error("Doom engine not loaded!");
	}
});
