const socket = io();
const messageText = document.querySelector('#message')
const sendButton = document.querySelector('#sendButton')
const chatBox = document.querySelector('.chatContent')
const displayMessage = document.querySelector('.message')

let yourName;

do {
    yourName = prompt('What is your name?')
} while (!yourName)

document.querySelector('#yourName').textContent = yourName

messageText.focus()

sendButton.addEventListener('click', (e) => {
    e.preventDefault()
    sendMessage(messageText.value)
    messageText.value = ''
    messageText.focus()
    chatBox.scrollTop = chatBox.scrollHeight
})

const sendMessage = message => {
    let content = {
        user: yourName,
        message: message.trim()
    }

    display(content, 'sent')

    socket.emit('sendMessage', content)
}

socket.on('sendToAll', content => {
    display(content, 'received')
    chatBox.scrollTop = chatBox.scrollHeight
})

const display = (content, type) => {
    const messageDiv = document.createElement('div')
    let className = type
    messageDiv.classList.add(className, 'messageRow')
    let time = new Date().toLocaleTimeString()
    let innerText = `
        <div class="messageTitle">
            ${content.user}
        </div>
        <div class="messageContent">
            ${content.message}
        </div>
        <div class="messageTime">
            ${time}
        </div>
    `;
    messageDiv.innerHTML = innerText;
    displayMessage.appendChild(messageDiv)
}