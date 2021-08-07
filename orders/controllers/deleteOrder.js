const Order = require('../orderModel');

async function deleteOrder(req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send(`Order with the id ${req.params.id} was deleted from the database`);
  } catch {
    res.status(404).json(`Order with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = deleteOrder;
