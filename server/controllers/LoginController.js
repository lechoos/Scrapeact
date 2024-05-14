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

		return res.status(202).json({ ...user, accessToken: accessToken, id: user._id });
	});
};

module.exports = LoginController;
