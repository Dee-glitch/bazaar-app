const Address = require('../addressModel');
const User = require('../../users/userModel');

async function deleteAddress(req, res) {
  try {
    const deletedFromAddresses = await Address.findByIdAndDelete(req.params.addressId);
    if (!deletedFromAddresses)
      return res
        .status(400)
        .json({ success: false, message: 'Failed to delete address from addresses!' });

    const user = await User.findById(req.params.userId);
    Object.assign(user, req.body);
    const deletedFromUser = await user.save();
    if (!deletedFromUser)
      return res
        .status(400)
        .json({ success: false, message: 'Failed to delete address from user!' });
    res
      .status(200)
      .send(`Address with the id ${req.params.addressId} was deleted from the database`);
  } catch {
    res
      .status(404)
      .json(`Address with the id ${req.params.addressId} does not exist in the database`);
  }
}
module.exports = deleteAddress;
