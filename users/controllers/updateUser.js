const User = require('../userModel');

async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    user.save();
    res.status(200).send(user);
  } catch {
    res.status(404).json(`User with the id ${req.params.id} does not exist in the database`);
  }
}

module.exports = updateUser;
