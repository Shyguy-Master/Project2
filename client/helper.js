const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
    //console.log(message);
};

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const sendDelete = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const hideError = () => {
    document.getElementById('domoMessage').classList.add('hidden');
};

const sendDonate = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};
const sendDonateReset = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const sendPostChat = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const sendFileUpload = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        body: new FormData(data.fileData),
    });

    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');

    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const sendClearChat = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

const sendDeleteChats = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
    
    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

module.exports = {
    handleError,
    sendPost,
    sendDelete,
    hideError,
    sendDonate,
    sendDonateReset,
    sendPostChat,
    sendFileUpload,
    sendClearChat,
    sendDeleteChats,
};