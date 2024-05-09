const bcrypt = require('bcrypt');
const User = require('../models/User');
const { EMAIL_REGEX } = require('../regex');

const EditUserController = async (req, res) => {
	const { _id, nickname, email, password } = await req.body;

	try {
		const user = await User.findOne({ _id: _id });

		if (!user) {
			return res.status(404).json({ message: 'Użytkownik nie istnieje!' });
		}

		if (nickname.length < 5) {
			return res.status(401).json({ message: 'Nazwa użytkownika musi mieć co najmniej 4 znaki!' });
		} else {
			user.nickname = nickname;
		}

		if (email !== user.email) {
			if (EMAIL_REGEX.test(email)) {
				const doesExist = await User.findOne({ email: email });

				if (doesExist) {
					return res.status(409).json({ message: 'Podany adres email jest już zajęty!' });
				}

				user.email = email;
			} else {
				return res.status(401).json({ message: 'Adres email jest nieprawidłowy' });
			}
		}

		if (password.length !== 0 && password.length >= 6) {
			const hash = await bcrypt.hash(password, 10);
			user.password = hash;
		} else if (password.length === 0) {
			user.password = user.password;
		} else {
			return res.status(401).json({ message: 'Hasło musi mieć co najmniej 6 znaków!' });
		}

		await user.save();

		return res.status(202).json('Dane użytkownika zostały zaktualizowane');
	} catch (ex) {
		console.log(ex);
		return res.status(500).json({ message: 'Wystąpił błąd podczas edycji konta użytkownika' });
	}
};

module.exports = EditUserController;
