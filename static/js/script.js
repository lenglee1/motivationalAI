document.getElementById('send-btn').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() !== '') {
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            chatbox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
            chatbox.scrollTop = chatbox.scrollHeight;
        });

        document.getElementById('user-input').value = '';
    }
}
