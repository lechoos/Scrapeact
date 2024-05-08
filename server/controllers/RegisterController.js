const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createTokens } = require('../JWT');

const RegisterController = (req, res) => {
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
}

module.exports = RegisterController;