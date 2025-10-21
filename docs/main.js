// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
// chatbot
async function sendMessage() {
  const userInput = document.getElementById("userInput").value;

  const response = await fetch("https://my-chatbot.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  document.getElementById("chatbox").innerText += "\nBot: " + data.reply;
}
