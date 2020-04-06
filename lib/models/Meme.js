const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  top: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Meme', schema);