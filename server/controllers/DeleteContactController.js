const Contact = require('../models/Contact');

const DeleteContactController = async (req, res) => {
	const { uuid, owner } = req.params;

	try {
		const contact = await Contact.findOneAndDelete({ uuid: uuid, ownerID: owner });
		console.log(contact);

		res.status(202).json('ok');
	} catch (error) {
    return res.status(400).json('Nie udało się usunąć kontaktu');
  }
};

module.exports = DeleteContactController;
