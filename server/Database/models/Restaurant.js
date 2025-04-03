const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, default: null } // Field to store image path
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
