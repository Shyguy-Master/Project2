const handleError = (message) => {
    console.log(message);
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

const sendDonate = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
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

    if (result.redirect) {
        window.location = result.redirect;
    }
    
    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
    else {
        return result.fileId;
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
    sendDonate,
    sendDonateReset,
    sendPostChat,
    sendFileUpload,
    sendClearChat,
    sendDeleteChats,
};