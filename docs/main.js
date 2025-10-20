// Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// chatbot

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    const chatBody = document.getElementById('chat-body');
    const userMsg = document.createElement('div');
    userMsg.textContent = "You: " + message;
    chatBody.appendChild(userMsg);

    try {
        const response = await fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();

        const botMsg = document.createElement('div');
        botMsg.textContent = "Bot: " + data.reply;
        chatBody.appendChild(botMsg);
    } catch (error) {
        console.error('Error:', error);
    }

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}
