const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  }
})

module.exports = mongoose.model('Contact', contactSchema)