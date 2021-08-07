const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const User = require('../userModel');

async function facebookLogin(req, res) {
  const { accessToken, userID, picture } = req.body;
  try {
    const urlFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    const { data } = await axios.get(urlFacebook);
    const { email, name } = data;
    const password = uuidv4();

    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json(user);
    } else {
      const newUser = await User.create({
        first_name: name,
        last_name: name,
        email,
        password,
        avatar: picture,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong...');
  }
}

module.exports = facebookLogin;
