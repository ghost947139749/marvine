document.getElementById('sendButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value.trim();
    if (messageText) {
        var chatBox = document.getElementById('chatBox');

        // Create user message
        var userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = '<div class="content">' + messageText + '</div>';
        chatBox.appendChild(userMessage);

        // Send message to Flask server
        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => response.json())
        .then(data => {
            // Create bot message
            var botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = '<div class="content">' + data.message + '</div>';
            chatBox.appendChild(botMessage);

            // Clear input field
            messageInput.value = '';

            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        });
    }
});