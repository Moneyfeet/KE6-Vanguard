// enquiry submition
function UI(message) {
    // creates and displays the error popup message in the UI
    const errorDiv = document.createElement("div");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.style.float = "right";
    closeBtn.addEventListener("click", () => {
        errorDiv.remove();
    });
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    //change the background and text color of the error message
    if (message.toLowerCase().includes("success")) {
        errorDiv.style.background = "#4CAF50";
        errorDiv.style.color = "#fff";
    } else {
        errorDiv.style.background = "#ff4d4d";
        errorDiv.style.color = "#fff";
    }
    document.body.appendChild(errorDiv);
    errorDiv.appendChild(closeBtn);
}

function submit() {
    const name = document.getElementById("Name").value.trim(); 
    const email = document.getElementById("Email").value.trim();
    const contact = document.getElementById("Contact").value.trim();
    if (name === "" || email === "" || contact.value === "") {
        UI("Please fill in all fields.");
        return;
    } 
    if (!email.includes("@") || !email.includes(".")) {
        UI("Please enter a valid email address.");
        return;
    } 
    
    const contactInput = document.getElementById("Contact");
    if (!contactInput) {
        console.error("Element with ID 'Contact' not found");
        return;
    }
    //display the success message
    UI("Your enquiry has been submitted successfully!");
};



//toggle button
function toggleChatbot() {
    var chatbot = document.getElementById("chatbot");
    if (chatbot.style.display === "block") {
        chatbot.style.display = "none";
        document.getElementById("close-btn").innerText = "Chat";
    } else {
        chatbot.style.display = "block";
        document.getElementById("close-btn").innerText = "X";
    }
};

// chatbot
const API_BASE = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://chatbot-api-a65d.onrender.com";

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const botMsg = document.createElement('div');
    const userMsg = document.createElement('div');
    const message = input.value.trim();

    if (!message) return;

    try {
        const response = await fetch(`${API_BASE}/chatbot`, {  // ← make sure "/chatbot" is included
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();

        userMsg.textContent = "You: " + message;
        chatBody.appendChild(userMsg);

        botMsg.textContent = "Bot: " + data.reply;
        chatBody.appendChild(botMsg);
    } catch (error) {
        console.error('Error:', error);
    }

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}
