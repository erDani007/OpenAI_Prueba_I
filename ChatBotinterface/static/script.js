const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== '') {
        displayMessage(userMessage, 'user');
        userInput.value = '';

        // Enviar el mensaje del usuario al servidor para procesar con GPT-3
        fetch('/procesar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar la respuesta generada por GPT-3
            displayMessage(data.respuesta, 'chatbot');
        });
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
