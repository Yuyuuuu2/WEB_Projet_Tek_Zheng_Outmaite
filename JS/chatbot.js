
class ChatHistory {
    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    getHistory() {
        return this.messages;
    }
}

const chatHistory = new ChatHistory();
let intentsData = [];

window.addEventListener("load", () => {
    fetch("../json/intents.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur chargement JSON");
            }
            return response.json();
        })
        .then(data => {
            intentsData = data.intents;
            console.log("JSON chargé !");
        })
        .catch(error => {
            console.error("Erreur :", error);
        });

    const saved = sessionStorage.getItem("chatHistory");

    if (saved) {
        const messages = JSON.parse(saved);

        messages.forEach(msg => {
            showMessage(msg.text, msg.type, false);
        });
    }
});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem(
        "chatHistory",
        JSON.stringify(chatHistory.getHistory())
    );
});

function showMessage(message, type, save = true) {
    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");
    div.classList.add("message", type);
    div.textContent = message;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (save) {
        chatHistory.addMessage({
            text: message,
            type: type
        });
    }
}

// Affichage des indicateurs de Gizmo
function showTyping(text) {
    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");
    div.classList.add("message", "bot", "typing-indicator");
    div.id = "gizmo-typing";
    div.textContent = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Suppression de l'indicateur
function removeTyping() {
    const typing = document.getElementById("gizmo-typing");

    if (typing) {
        typing.remove();
    }
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const userMessage = input.value.trim();

    if (userMessage === "") return;

    // Afficher le message utilisateur
    showMessage(userMessage, "user");

    input.value = "";

    // Étape 1 : Gizmo réfléchit pendant 1 seconde
    showTyping("Gizmo réfléchit...");

    setTimeout(() => {

        // Étape 2 : Gizmo écrit pendant 2 secondes
        removeTyping();
        showTyping("Gizmo écrit...");

        setTimeout(() => {

            // Étape 3 : Afficher la réponse
            removeTyping();

            const botResponse = processMessage(userMessage);
            showMessage(botResponse, "bot");

        }, 2000);

    }, 1000);
}

function processMessage(message) {
    let response = "Désolé, je n'ai pas compris votre message.";

    intentsData.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                response = intent.responses[
                    Math.floor(Math.random() * intent.responses.length)
                ];
            }
        });
    });

    return response;
}
