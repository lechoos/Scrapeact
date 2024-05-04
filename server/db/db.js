const mongoose = require('mongoose');
const User = require('../models/User');
const Contact = require('../models/Contact');

mongoose
	.connect(
		`mongodb+srv://dev:${process.env.DEV_PASSWORD}@cluster1.jzml6ex.mongodb.net/development?retryWrites=true&w=majority&appName=Cluster1`
	)
	.then(async () => {
		const users = await Contact.find({});
		console.log(users);
	})
	.catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection;
