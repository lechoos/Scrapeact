require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const { createTokens, validateToken } = require('./JWT');

const ScrapingRoutes = require('./routes/ScrapingRoutes');
const UserRoutes = require('./routes/UserRoutes');

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

app.use(ScrapingRoutes);

app.use(UserRoutes);

app.listen(3000, () => {
	console.log('Serwer słucha na porcie 3000...');
});
