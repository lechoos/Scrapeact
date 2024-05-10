require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ScrapingRoutes = require('./routes/ScrapingRoutes');
const UserRoutes = require('./routes/UserRoutes');
const ContactRoutes = require('./routes/ContactRoutes');

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(cookieParser());

require('./db/db');

app.get('/', (req, res) => {
	res.send('Hello Vercel');
});

app.use(ScrapingRoutes);

app.use(UserRoutes);

app.use(ContactRoutes);

app.listen(4000);

module.exports = app;
