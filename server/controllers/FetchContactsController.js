const Contact = require('../models/Contact');

const FetchContactsController = async (req, res) => {
	const { id } = req.params;

	try {
		const contacts = await Contact.find({ ownerID: id });
		res.status(202).json(contacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = FetchContactsController;
