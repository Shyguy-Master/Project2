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

const handleDeleteForms = () => {
    const clearButton = document.getElementById('clearButton');
    const deleteButton = document.getElementById('deleteButton');

    clearButton.addEventListener('click', (e) => {
        e.preventDefault();

        const channelSelectVal = document.getElementById('channelSelect').value;

        helper.sendClearChat("/clearChat", { channel: channelSelectVal }, loadChatFromServer);

        return false;
    });

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        const channelSelectVal = document.getElementById('channelSelect').value;

        helper.sendDeleteChats("/clearMessages", { channel: channelSelectVal }, loadChatFromServer);

        return false;
    });
};

const displayMessage = async (content) => {
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
                //<div key={msg._id}><strong>{msg.username}</strong> {msg.date}<br />{msg.content}</div>
                <div key={msg._id}><strong>{msg.username}</strong> <font color="gray">{msg.createdDate}</font><br />{msg.content}</div>
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
    handleDeleteForms();

    loadChatFromServer();

    socket.on('chat message', displayMessage);
    handleChannelSelect();
};

window.onload = init;