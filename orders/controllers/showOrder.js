const Order = require('../orderModel');

async function showOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('product')
      .populate('address');
    res.status(200).send(order);
  } catch {
    res.status(404).json(`Order with the id ${req.params.id} does not exist in the database`);
  }
}
module.exports = showOrder;
