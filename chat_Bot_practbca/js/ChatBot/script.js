document.getElementById("message-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Предотвращает перенос строки в поле ввода
        sendMessage();
    }
});

function sendMessage() {
    console.log(1000)
    const input = document.getElementById("message-input");
    const message = input.value.trim();
    if (message === "") return;
    
    addMessage(message, "user-message");
    input.value = "";
    
    // setTimeout(() => {
    //     const response = fetch(`http://localhost:8000/talk?query=${message}`, {method: "GET"}).then((j) => j.json())
    //     addMessage("писька", "bot-message");
    // }, 1000);


    setTimeout(() => {
        addMessage("Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "bot-message");
    }, 1000);
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", className);
    messageElement.textContent = text;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}