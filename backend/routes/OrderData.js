const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });
    console.log(data);
    console.log(typeof data);
    
    let eId = await Order.findOne({ email: req.body.email }); // ✅ Should work if imported correctly
    if (!eId) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
=======
const Order = require('../models/Orders');

// Route to fetch food data (example)
router.post('/foodData', (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (error) {
    console.error('Error fetching food data:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to handle order data
router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    if (!data || !req.body.email) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    console.log("🛒 Incoming order data:", data);

    // Add order date at the beginning
    data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("📅 Updated order data with date:", data);

    let existingOrder = await Order.findOne({ email: req.body.email });
    console.log("🔎 Existing Order:", existingOrder);

    if (!existingOrder) {
      console.log("✨ Creating new order for:", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
      return res.json({ success: true });
    } else {
      console.log("♻️ Updating existing order for:", req.body.email);
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
<<<<<<< HEAD
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email); // ✅ Check if email is received properly
        
        let myData = await Order.findOne({ email: req.body.email });
        console.log("Fetched Data:", myData); // ✅ Check if data is fetched from MongoDB
        
        if (myData) {
            res.json({ orderData: myData.order_data });
        } else {
            res.json({ orderData: [] });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});
=======
      return res.json({ success: true });
    }
  } catch (error) {
    console.error('❌ Error in orderData endpoint:', error.message);
    return res.status(500).json({ error: error.message });
  }
});
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0

module.exports = router;
