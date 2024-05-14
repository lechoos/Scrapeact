const mongoose = require('mongoose');

mongoose
	.connect(`mongodb+srv://dev:${process.env.DEV_PASSWORD}@cluster1.jzml6ex.mongodb.net/development?retryWrites=true&w=majority&appName=Cluster1`)
	.then(() => {
		console.log('Połączono z bazą danych');
	})
	.catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection;
