const Order = require('../orderModel');

async function createOrder(req, res) {
  try {
    const order = await new Order(req.body);
    await order.save();
    res.status(201).json('Order created successfully');
  } catch (error) {
    res.status(400).json(`An error occurred: ${error} `);
  }
}

module.exports = createOrder;
