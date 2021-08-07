const User = require('../userModel');

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send(`User with the id ${req.params.id} was deleted from the database`);
  } catch {
    res.status(404).json(`User with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = deleteUser;
