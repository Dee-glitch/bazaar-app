const Address = require('../addressModel');
const User = require('../../users/userModel');

const createAddress = async (req, res) => {
  try {
    const { user } = req.body;
    const newAddress = new Address(req.body);
    const saved = await newAddress.save();
    if (!saved)
      return res.status(400).json({ success: false, message: 'Failed to save address!' });

    const added = await User.findByIdAndUpdate(user, { $push: { addresses: saved._id } });
    if (!added)
      return res.status(400).json({ success: false, message: 'Cannot add address to user!' });

    res.status(201).json({ success: true, address: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = createAddress;
