const User = require('../../users/userModel');
const Address = require('../addressModel');

const showAddresses = (req, res) => {
  const addresses = [];

  try {
    User.findById(req.params.id, async (err, user) => {
      if (err) return res.status(400).json({ success: false, message: err });

      for await (const addressId of user.addresses)
        await Address.findById(addressId, (error, address) => {
          if (error) return res.status(400).json({ success: false, message: error });
          return addresses.push(address);
        });

      res.status(200).json({ success: true, addresses });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
module.exports = showAddresses;
