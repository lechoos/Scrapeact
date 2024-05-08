const User = require('../models/User');

const DeleteUserController = async (req, res) => {
	const { _id } = await req.body;

	try {
		await User.findOneAndDelete({ _id: _id });

		res.clearCookie('access-token');
		res.clearCookie('user');

		res.status(200).json('Usunięto');
	} catch (error) {
		res.status(400).json({ error: true, message: 'Wystąpił błąd przy usuwaniu użytkownika' });
	}
};

module.exports = DeleteUserController;
