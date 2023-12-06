const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const socket = io();

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    //const channelSelect = document.getElementById('channelSelect');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (editBox.value) {
            socket.emit('chat message', editBox.value);
            editBox.value = '';
        }

        return false;
    });
};

const handleDeleteForm = () => {
    const deleteButton = document.getElementById('deleteButton');
    const channelSelectVal = document.getElementById('channelSelect').value;

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        helper.sendDeleteChat("/deleteChat", { channel: channelSelectVal }, loadChatFromServer);

        return false;
    });
};

const displayMessage = async (content) => {
    // const messageDiv = document.createElement('div');
    // messageDiv.innerText = content;
    // document.querySelector('.chatList').appendChild(messageDiv);

    const channel = document.getElementById('channelSelect').value;

    helper.sendPostChat("/saveChat", {channel, content}, loadChatFromServer);

    return false;
};

const ChatMessage = (props) => {
    const channelSelect = document.getElementById('channelSelect');

    if (props.chat.length === 0) {
        return (
            <div className="chatList"></div>
        );
    }

    const chatMsg = props.chat.map(msg => {
        if (msg.channel === channelSelect.value) {
            return (
                <div key={msg._id}>{msg.username} - {msg.content}</div>
            );
        }

        return (
            <div></div>
        );
    });
    
    return (
        <div className="chatList">{chatMsg}</div>
    );
};

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');

    channelSelect.addEventListener('change', () => {
        //messages.innerHTML = '<div class=\"chatList\"></div>';
        socket.emit('room change', channelSelect.value);
        loadChatFromServer();
    });
};

const loadChatFromServer = async () => {
    const response = await fetch('/getChat');
    const data = await response.json();
    ReactDOM.render(<ChatMessage chat={data.chat} />, document.getElementById('messages'));
};

const init = () => {
    handleEditBox();
    handleDeleteForm();

    loadChatFromServer();

    socket.on('chat message', displayMessage);
    handleChannelSelect();
};

window.onload = init;