const Order = require('../orderModel');

async function showOrders(req, res) {
  const orders = await Order.find().populate('user').populate('product').populate('address');
  res.status(200).send(orders);
}
module.exports = showOrders;
