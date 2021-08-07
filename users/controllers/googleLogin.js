const pkg = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');
const User = require('../userModel');

const { OAuth2Client } = pkg;

async function googleLogin(req, res) {
  const tokenId = req.body.userID;
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email_verified, name, email, given_name, picture } = payload;
    const password = uuidv4();
    const user = await User.findOne({ email });

    if (email_verified) {
      if (user) {
        if (password) {
          res.status(200).json(user);
        } else {
          res.status(401);
          throw new Error('Invalid email or password');
        }
      } else {
        const newUser = await User.create({
          first_name: name,
          last_name: given_name,
          email,
          password,
          avatar: picture,
        });
        res.status(201).json(newUser);
      }
    } else {
      res.status(400);
      throw new Error('Email address not verified');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong...');
  }
}
module.exports = googleLogin;
