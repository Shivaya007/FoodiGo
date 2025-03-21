const mongoose = require('mongoose');

<<<<<<< HEAD
const orderSchema = new mongoose.Schema({
=======
const OrderSchema = new mongoose.Schema({
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
  email: {
    type: String,
    required: true
  },
  order_data: {
    type: Array,
    required: true
  }
});

<<<<<<< HEAD
const Order = mongoose.model('Order', orderSchema);

module.exports = Order; // ✅ Exporting the model directly
=======
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
