const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

function addUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
} chatBox = document.getElementById('chat-box');
 userInput = document.getElementById('user-input');
 sendButton = document.getElementById('send-btn');

function addUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.textContent = message;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateBotResponse(userMessage) {
    // Simulate a bot response here (replace with real chatbot interaction).
    setTimeout(() => {
        const response = "i am anxious";
        addBotMessage(response);
    }, 1000);
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addUserMessage(userMessage);
    userInput.value = '';

    // Send user message to the bot (simulate bot response).
    addBotMessage('Thinking...');
    simulateBotResponse(userMessage);
});

// Handle user pressing Enter key in the input field.
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click(); // Trigger the Send button click event.
    }
});


function addBotMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.textContent = message;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateBotResponse(userMessage) {
    // Simulate a bot response here (replace with real chatbot interaction).
    setTimeout(() => {
        const response = "i am anxious";
        addBotMessage(response);
    }, 1000);
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addUserMessage(userMessage);
    userInput.value = '';

    // Send user message to the bot (simulate bot response).
    addBotMessage('Thinking...');
    simulateBotResponse(userMessage);
});

// Handle user pressing Enter key in the input field.
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click(); // Trigger the Send button click event.
    }
});