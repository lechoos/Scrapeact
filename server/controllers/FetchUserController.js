const User = require('../models/User');

const FetchUserController = async (req, res) => {
	const { id } = req.body;

	const user = await User.findOne({ _id: id });

	if (user) {
		return res.json(user);
	} else {
		return res.json({ message: 'Nie znaleziono użytkownika' });
	}
};

module.exports = FetchUserController;
