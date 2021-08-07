const Address = require('../addressModel');

async function ShowAddress(req, res) {
  try {
    const address = await Address.findById(req.params.id)
    res.status(200).send(address);
  } catch {
    res.status(404).json(`Address with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = ShowAddress;
