const Contact = require('../models/Contact');

const SaveContactController = async (req, res) => {
	const contacts = await req.body;

	try {
		for (const contact of contacts) {
			const newContact = await new Contact({
				name: contact.name,
				link: contact.link,
				phone: contact?.phone,
				uuid: contact.uuid,
				ownerID: contact.ownerID,
			});

			await newContact.save();
		}

    res.status(200).json('Kontakty zostały zapisane');
	} catch (error) {
    res.status(500).json('Wystąpił problem');
		console.log(error);
	}
};

module.exports = SaveContactController;
