const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  channel: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  username: {
    type: String,
    require: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ChatSchema.statics.toAPI = (doc) => ({
  channel: doc.channel,
  content: doc.content,
  username: doc.username,
});

const ChatModel = mongoose.model('Chat', ChatSchema);
module.exports = ChatModel;
