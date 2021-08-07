const User = require('../userModel');

async function createUser(req, res) {
  try {
    const user = await new User(req.body);
    await user.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    res.status(400).json(`An error occurred: ${error} `);
  }
}

module.exports = createUser;
