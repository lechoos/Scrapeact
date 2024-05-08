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
		type: String,
	},
	uuid: {
		type: String,
    required: true,
	},
  ownerID: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Contact', contactSchema);
