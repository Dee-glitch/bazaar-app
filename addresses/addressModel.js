const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    street_name: { type: String, required: true },
    building_number: { type: String, required: true },
    extension: { type: String, required: false },
    post_code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    comment: { type: String, required: false },
  },
  { timestamps: true },
);

const Address = mongoose.model('address', addressSchema);

module.exports = Address;
