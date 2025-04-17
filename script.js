
function toggleChatbot() {
    var bot = document.getElementById("samalen-chatbot");
    bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    if (message.trim() === "") return;

    const chatBody = document.getElementById("chat-body");
    const userMessage = document.createElement("div");
    userMessage.textContent = "Wewe: " + message;
    chatBody.appendChild(userMessage);

    const botResponse = document.createElement("div");
    botResponse.textContent = "SAMALEN AI: " + getBotResponse(message);
    chatBody.appendChild(botResponse);

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes("simba") || lower.includes("yanga")) {
        return "Mechi ya Simba vs Yanga ni ya kusisimua sana! Unadhani nani atashinda?";
    }
    if (lower.includes("chelsea")) {
        return "Chelsea wana mechi kali wiki hii! Tafadhali tazama ratiba kamili.";
    }
    return "Samahani, bado najifunza. Tafadhali jaribu tena au uliza swali lingine.";
}
