const mongoose = require('mongoose');
const User = require('../models/User');
const Contact = require('../models/Contact');

mongoose
	.connect(
		`mongodb+srv://dev:${process.env.DEV_PASSWORD}@cluster1.jzml6ex.mongodb.net/development?retryWrites=true&w=majority&appName=Cluster1`
	)
	.then(async () => {
		console.log('Połączono');
	})
	.catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection;
