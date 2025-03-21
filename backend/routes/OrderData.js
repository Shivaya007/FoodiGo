const express = require('express');
const router = express.Router();

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
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
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

module.exports = router;
