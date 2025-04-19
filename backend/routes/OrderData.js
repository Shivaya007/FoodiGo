const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// ✅ Route to fetch food data
router.post('/foodData', (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error('🚨 Error fetching food data:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ Route to handle order data (placing orders)
router.post('/orderData', async (req, res) => {
  try {
    let { order_data, email, order_date } = req.body;
    
    if (!order_data || !email) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    console.log("🛒 Incoming Order Data:", order_data);

    // Add order date at the beginning
    order_data.unshift({ Order_date: order_date });
    console.log("📅 Updated Order Data:", order_data);

    let existingOrder = await Order.findOne({ email });
    console.log("🔎 Existing Order Found:", existingOrder);

    if (!existingOrder) {
      console.log("✨ Creating New Order for:", email);
      await Order.create({ email, order_data: [order_data] });
    } else {
      console.log("♻️ Updating Existing Order for:", email);
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data } }
      );
    }

    res.json({ success: true });

  } catch (error) {
    console.error("🚨 Order Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Route to fetch a user's order history
router.post('/myOrderData', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("📩 Fetching Orders for:", email);

    let userOrders = await Order.findOne({ email });

    if (userOrders) {
      console.log("✅ Order Data Fetched Successfully!");
      res.json({ orderData: userOrders.order_data });
    } else {
      console.log("⚠️ No Orders Found for:", email);
      res.json({ orderData: [] });
    }
  } catch (error) {
    console.error("🚨 Fetch Order Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
