const Contact = require('../models/Contact');

const UpdateContactController = async (req, res) => {
	const data = req.body;

	try {
		const contact = await Contact.findOne({ uuid: data.uuid, ownerID: data.ownerID });

		if (contact.name !== data.name) {
			contact.name = data.name;
		}

		if (contact.phone !== data.phone) {
			contact.phone = data.phone;
		}

		await contact.save();
	} catch (error) {
    return res.status(400).json({ message: 'Wystąpił błąd przy zapisywaniu danych' });
  }

	res.json('ok');
};

module.exports = UpdateContactController;
