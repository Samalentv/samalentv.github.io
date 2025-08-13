function toggleChatbot() {
    var bot = document.getElementById("samalen-chatbot");
    bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    if (message.trim() === "") return;

    const chatBody = document.getElementById("chat-body");
    appendMessage("Wewe", message);

    showLoading(chatBody);

    getBotResponse(message).then(response => {
        removeLoading(chatBody);
        appendMessage("SAMALEN AI", response);
        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
    });
}

function appendMessage(sender, text) {
    const chatBody = document.getElementById("chat-body");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = `${sender}: ${text}`;
    chatBody.appendChild(msgDiv);
}

function showLoading(chatBody) {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.innerHTML = '<span class="spinner"></span> SAMALEN AI: Inafikiri...';
    chatBody.appendChild(loadingDiv);
}

function removeLoading(chatBody) {
    const loadingDiv = document.getElementById("loading");
    if (loadingDiv) chatBody.removeChild(loadingDiv);
}

// New: Clear chat function
function clearChat() {
    const chatBody = document.getElementById("chat-body");
    chatBody.innerHTML = "";
}

// New: Handle Enter key for sending message
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("user-input");
    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") sendMessage();
    });
});

// Basic Q&A and fallback to AI API
async function getBotResponse(msg) {
    const lower = msg.toLowerCase();

    // Basic greetings
    if (["hi", "hello", "habari", "hey"].some(greet => lower.includes(greet))) {
        return "Habari! Mimi ni SAMALEN AI. Naendelea kujifunza, na niko hapa kukusaidia.";
    }
    if (lower.includes("what is your name") || lower.includes("jina lako")) {
        return "Jina langu ni Samuel Efrem assistant, lakini hapa naitwa SAMALEN AI.";
    }
    if (lower.includes("who are you") || lower.includes("wewe ni nani")) {
        return "Mimi ni SAMALEN AI, chatbot ya awali inayojifunza kila siku!";
    }
    if (lower.includes("phase") || lower.includes("version")) {
        return "Niko kwenye awamu ya kwanza ya maendeleo. Nitaendelea kuboresha kadri muda unavyosonga!";
    }
    if (lower.includes("simba") || lower.includes("yanga")) {
        return "Mechi ya Simba vs Yanga ni ya kusisimua sana! Unadhani nani atashinda?";
    }
    if (lower.includes("chelsea")) {
        return "Chelsea wana mechi kali wiki hii! Tafadhali tazama ratiba kamili.";
    }
    if (lower.includes("thank you") || lower.includes("asante")) {
        return "Karibu sana! Kama una swali lingine, uliza tu.";
    }
    if (lower.includes("weather") || lower.includes("hali ya hewa")) {
        return "Samahani, siwezi kutoa taarifa za hali ya hewa kwa sasa. Tafadhali angalia tovuti za hali ya hewa.";
    }
    if (lower.includes("clear chat") || lower.includes("futa mazungumzo")) {
        clearChat();
        return "Mazungumzo yamefutwa!";
    }
    if (lower.includes("help") || lower.includes("msaada")) {
        return "Unaweza kuniuliza maswali ya kawaida, habari, michezo, au kutumia AI ya wazi kwa maswali magumu.";
    }

    // Try to get answer from open-source AI (e.g., Hugging Face Inference API)
    try {
        // Using your Hugging Face API key
        const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: msg })
        });
        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
            return data[0].generated_text + " (Jibu kutoka AI ya wazi)";
        }
    } catch (e) {
        return "Samahani, bado najifunza. Tafadhali jaribu tena au uliza swali lingine.";
    }

    return "Samahani, bado najifunza. Tafadhali jaribu tena au uliza swali lingine.";
}
