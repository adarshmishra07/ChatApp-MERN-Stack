const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatName :{
    type:String
  },
  messages :[],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
