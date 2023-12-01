const models = require('../models');

const { Chat } = models;

const hostIndex = (req, res) => {
  res.render('index');
};

const getChat = async (req, res) => {
  try {
    const docs = await Chat.find({}).select('channel content').lean().exec();
    return res.json({ chat: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving chat!' });
  }
};

const saveChat = async (req, res) => {
  if (!req.body.channel) {
    return res.status(400).json({ error: 'No channel!' });
  }

  const chatData = {
    channel: req.body.channel,
    content: req.body.content,
    owner: req.session.account._id,
  };

  try {
    const newChat = new Chat(chatData);
    await newChat.save();
    return res.status(201).json({ channel: newChat.channel, content: newChat.content });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Chat already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making chat!' });
  }
};

const deleteAllChats = async (req, res) => {
  const docs = await Chat.find({}).deleteMany({ channel: req.body.channel });
  return res.json({ chat: docs });
};

module.exports = {
  hostIndex,
  getChat,
  saveChat,
  deleteAllChats,
};