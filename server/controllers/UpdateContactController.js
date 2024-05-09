const Contact = require('../models/Contact');

const UpdateContactController = async (req, res) => {
	const data = req.body;

	const contact = await Contact.findOne({ uuid: data.uuid, ownerID: data.ownerID });

	console.log(contact);

	if (contact.name !== data.name) {
		contact.name = data.name;
	}

	if (contact.phone !== data.phone) {
		contact.phone = data.phone;
	}

  await contact.save();

	res.json('ok');
};

module.exports = UpdateContactController;
