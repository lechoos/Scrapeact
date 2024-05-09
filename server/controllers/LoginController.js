const bcrypt = require('bcrypt');
const { createTokens } = require('../JWT');
const User = require('../models/User');

const LoginController = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (!user) {
		return res.status(404).json({ message: 'Użytkownik nie istnieje!' });
	}

	const dbPassword = user.password;
	bcrypt.compare(password, dbPassword).then(match => {
		if (!match) {
			return res.status(401).json({ message: 'Hasło jest błędne!' });
		}

		const accessToken = createTokens(user);

		res.cookie('access-token', accessToken, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
			httpOnly: true,
			domain: 'localhost',
			path: '/',
		});

		res.cookie('user', user._id, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
		});

		return res.status(200);
	});
};

module.exports = LoginController;
