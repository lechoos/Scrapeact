require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const { createTokens, validateToken } = require('./JWT');

const app = express();

const ScrapeController = require('./controllers/ScrapeController');

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(cookieParser());

require('./db/db');

app.post('/register', (req, res) => {
	const { nickname, email, password } = req.body;
	bcrypt.hash(password, 10).then(async hash => {
		const newUser = new User({
			nickname,
			email,
			password: hash,
		});

		const doesExist = await User.find({ email: email });

		if (doesExist.length !== 0) {
			console.log(doesExist);
			return res.status(409).json({ error: true, message: 'Użytkownik już istnieje!' });
		}

		newUser
			.save()
			.then(() => {
				const accessToken = createTokens(newUser);

				res.cookie('access-token', accessToken, {
					maxAge: 60 * 60 * 24 * 30 * 1000,
					httpOnly: true,
					domain: 'localhost', // ustaw właściwą domenę
					path: '/', // ustaw właściwą ścieżkę
				});

				res.cookie('user', newUser._id, {
					maxAge: 60 * 60 * 24 * 30 * 1000,
				});

				res.json('Zapisano do bazy danych');
			})
			.catch(ex => {
				res.status(400).json({ error: ex });
			});
	});
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (!user) {
		return res.status(404).json({ error: true, message: 'Użytkownik nie istnieje!' });
	}

	const dbPassword = user.password;
	bcrypt.compare(password, dbPassword).then(match => {
		if (!match) {
			return res.status(401).json({ error: true, message: 'Hasło jest błędne!' });
		}

		const accessToken = createTokens(user);

		res.cookie('access-token', accessToken, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
			httpOnly: true,
			domain: 'localhost', // ustaw właściwą domenę
			path: '/', // ustaw właściwą ścieżkę
		});

		res.json('Zalogowano jako ' + user.nickname);
	});
});

app.get('/logout', validateToken, (req, res) => {
	res.clearCookie('access-token');
	res.clearCookie('user');

	return res.json('Wylogowano użytkownika');
});

app.get('/profile', validateToken, (req, res) => {
	res.json('profile');
});

app.post('/scrape', ScrapeController);

app.post('/user', async (req, res) => {
	const { id } = req.body;

	const user = await User.findOne({ _id: id });

	if (user) {
		return res.json(user);
	} else {
		return res.json({ error: true, message: 'Nie znaleziono użytkownika' });
	}
});

app.listen(3000, () => {
	console.log('Serwer słucha na porcie 3000...');
});
