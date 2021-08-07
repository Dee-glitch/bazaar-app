require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const Order = require('../orderModel');
const User = require('../../users/userModel');

const checkout = async (req, res) => {
  try {
    const { id, user, amount, product, address } = req.body;

    const payment = await stripe.paymentIntents.create({
      confirm: true,
      currency: 'eur',
      payment_method: id,
      amount: amount * 100,
      description: 'One time payment.',
    });

    if (payment.status !== 'succeeded')
      return res
        .status(400)
        .json({ success: false, message: 'Payment failed!' });

    const newOrder = new Order({ user, product, address });
    const saved = await newOrder.save();
    if (!saved) throw new Error('Cannot save order!');

    const added = await User.findByIdAndUpdate(user, {
      $push: { orders: saved._id },
    });
    if (!added) throw new Error('Cannot add order to user!');

    res.status(200).json({
      success: true,
      message: 'Payment successful.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = checkout;
