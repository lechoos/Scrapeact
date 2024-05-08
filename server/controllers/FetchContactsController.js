const Contact = require('../models/Contact');

const FetchContactsController = async (req, res) => {
  const { id } = req.params;

  try {
    const contacts = await Contact.find({ ownerID: id })
    res.json(contacts);
  } catch (error) {
    console.log(error)
  }
};

module.exports = FetchContactsController;