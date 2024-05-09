const User = require('../models/User');
const Contact = require('../models/Contact');

const DeleteUserController = async (req, res) => {
	const { _id } = await req.body;

	try {
		await User.findOneAndDelete({ _id: _id });
		await Contact.deleteMany({ ownerID: _id });

		res.clearCookie('access-token');
		res.clearCookie('user');

		res.status(200).json('Usunięto');
	} catch (error) {
		res.status(400).json({ message: 'Wystąpił błąd przy usuwaniu użytkownika' });
	}
};

module.exports = DeleteUserController;
