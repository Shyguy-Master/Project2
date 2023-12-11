const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const socket = io();

const handleDonateButton = () => {
    const donateButton = document.getElementById('donateButton');
    const donateResetButton = document.getElementById('donateResetButton');

    donateButton.addEventListener('click', (e) => {
        e.preventDefault();

        helper.sendDonate("/donate", {}, updateFileButtons);

        return false;
    });

    donateResetButton.addEventListener('click', (e) => {
        e.preventDefault();

        helper.sendDonateReset("/resetDonate", {}, updateFileButtons);

        return false;
    });
};

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    const uploadForm = document.getElementById('uploadForm');
    const fileButton = document.getElementById('fileButton');

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (editBox.value) {
            if (fileButton.files.length !== 0) {
                const fileId = await helper.sendFileUpload("/uploadFile", { fileData: uploadForm });
                socket.emit('chat pic message', editBox.value, fileId);
                uploadForm.reset();
            }
            else {
                socket.emit('chat message', editBox.value);
            }
            editBox.value = '';
        }
        else if (fileButton.files.length !== 0) {
            helper.sendFileUpload("/uploadFile", { fileData: uploadForm }, displayPicture);
            uploadForm.reset();
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
    
    helper.sendPostChat("/saveChat", { channel: channel, content: content }, loadChatFromServer);

    return false;
};

const displayMessageWithPicture = async (content, result) => {
    const channel = document.getElementById('channelSelect').value;

    helper.sendPostChat("/saveChat", { channel: channel, content: content, pictureTag: result }, loadChatFromServer);

    return false;
};

const displayPicture = async (result) => {
    const channel = document.getElementById('channelSelect').value;

    helper.sendPostChat("/saveChat", { channel: channel, content: "", pictureTag: result.fileId }, loadChatFromServer);

    return false;
};

const displayWelcomeMessage = async () => {
    const response = await fetch('/getUsername');
    const data = await response.json();

    helper.sendPostChat("/saveChat", { channel: "welcome", content: `------ ${data.username} joined ------`, username: "Welcome" }, loadChatFromServer);

    return false;
};

const ChatMessage = (props) => {
    const channelSelect = document.getElementById('channelSelect');

    if (props.chat.length === 0) {
        return (
            <div className="chatList"><hr/></div>
        );
    }

    const chatMsg = props.chat.map(msg => {
        const msgDate = new Date(msg.createdDate);
        const timeStamp = msgDate.toLocaleTimeString();
        if (msg.channel === channelSelect.value) {
            if (!msg.pictureTag) {
                return (
                    <div key={msg._id} id="messageLine">
                        <strong>{msg.username}</strong> <font color="gray">{timeStamp}</font><br />
                        {msg.content}
                    </div>
                );
            }
            else {
                return (
                    <div key={msg._id} id="messageLine">
                        <strong>{msg.username}</strong> <font color="gray">{timeStamp}</font><br />
                        {msg.content}<br />
                        <img src={`/retrieveFile?_id=${msg.pictureTag}`} />
                    </div>
                );
            }
        }

        return (
            <div></div>
        );
    });
    
    return (
        <div className="chatList"><hr/>{chatMsg}</div>
    );
};

const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');

    channelSelect.addEventListener('change', () => {
        socket.emit('room change', channelSelect.value);
        loadChatFromServer();
        if (channelSelect.value === "welcome") {
            document.getElementById('editBox').toggleAttribute('disabled', true);
            document.getElementById('editSubmit').toggleAttribute('disabled', true);
            document.getElementById('fileButton').toggleAttribute('disabled', true);
            uploadForm.reset();
        }
        else {
            document.getElementById('editBox').toggleAttribute('disabled', false);
            document.getElementById('editSubmit').toggleAttribute('disabled', false);
            updateFileButtonsFromServer();
        }
    });
};

const loadChatFromServer = async () => {
    const response = await fetch('/getChat');
    const data = await response.json();
    ReactDOM.render(<ChatMessage chat={data.chat} />, document.getElementById('messages'));
};

const updateFileButtonsFromServer = async () => {
    const response = await fetch('/getDonate');
    const data = await response.json();
    updateFileButtons(data);
};

const updateFileButtons = (results) => {
    const channelSelect = document.getElementById('channelSelect');
    if (results.donated) {
        document.getElementById('donateButton').toggleAttribute('disabled', true);
        document.getElementById('donateResetButton').toggleAttribute('disabled', false);
        if (channelSelect.value === "welcome") {
            document.getElementById('fileButton').toggleAttribute('disabled', true);
            uploadForm.reset();
        }
        else {
            document.getElementById('fileButton').toggleAttribute('disabled', false);
        }
    }
    else {
        document.getElementById('donateButton').toggleAttribute('disabled', false);
        document.getElementById('donateResetButton').toggleAttribute('disabled', true);
        document.getElementById('fileButton').toggleAttribute('disabled', true);
        uploadForm.reset();
    }
};

const createWelcomeChat = async () => {
    socket.emit('welcome message');
};

const init = () => {
    handleDonateButton();

    handleEditBox();
    handleDeleteForms();

    loadChatFromServer();
    createWelcomeChat();
    updateFileButtonsFromServer();

    socket.on('chat message', displayMessage);
    socket.on('chat pic message', displayMessageWithPicture);
    socket.on('welcome message', displayWelcomeMessage);
    handleChannelSelect();
};

window.onload = init;