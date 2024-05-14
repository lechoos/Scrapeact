const Contact = require('../models/Contact');

const SaveContactController = async (req, res) => {
	const contacts = await req.body;
	console.log(contacts)
	try {
		for (const contact of contacts) {
			const newContact = await new Contact({
				name: contact.name,
				link: contact.link,
				phone: contact?.phone,
				uuid: contact.uuid,
				ownerID: contact.ownerID,
			});

			const doesExist = await Contact.find({
				name: contact.name,
				link: contact.link,
				ownerID: contact.ownerID,
			})

			if (doesExist.length === 0) {
				await newContact.save();
			}
		}

    res.status(200).json('Kontakty zostały zapisane');
	} catch (error) {
	console.log(error);
    res.status(500).json('Wystąpił problem');
	}
};

module.exports = SaveContactController;
