const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    city: { type: String, required: false },
    images: [{ type: String, required: false }],
    condition: { type: String, enum: ['new', 'like new', 'fairly used'], required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    videos: [{ type: String, required: false }],
    verified: { type: Boolean, default: null },
  },
  { timestamps: true },
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
