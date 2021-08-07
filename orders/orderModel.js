const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    address: { type: Schema.Types.ObjectId, ref: 'address', required: true },
    amount: { type: String, required: false },
    status: { type: String, required: false },
  },

  { timestamps: true },
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
