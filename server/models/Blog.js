const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image : {
    type : String,
  }
});

module.exports = mongoose.model('Blog', BlogSchema);