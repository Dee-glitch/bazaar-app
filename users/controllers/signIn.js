const bcrypt = require('bcrypt');

const User = require('../userModel');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json(`Please provide an email to login!`);
  if (!password) return res.status(400).json(`Please provide a password to login!`);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json(`No account associated with this email!`);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json(`Invalid password!`);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = login;
