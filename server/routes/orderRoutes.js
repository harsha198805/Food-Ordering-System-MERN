const express = require("express");
const Order = require("../Database/models/Order");
const Payment = require("../Database/models/Payment");

const router = express.Router();

// Save order details after payment success
router.post("/save-order", async (req, res) => {
    try {
      const { items, paymentDetails, customerDetails, totalAmount } = req.body;
      
      console.log("Received Order Data:", req.body); // Log incoming request data
  
      // Save order details
      const newOrder = new Order({
        customer: customerDetails,
        items: items,
        totalAmount: totalAmount,
        status: "Completed",
      });
  
      await newOrder.save();
      console.log("Order saved successfully:", newOrder); // Log order creation
  
      // Save payment details
      const newPayment = new Payment({
        orderId: newOrder._id,
        paymentMethod: paymentDetails.paymentMethod,
        status: paymentDetails.status,
        transactionId: paymentDetails.transactionId,
        amount: totalAmount,
      });
  
      await newPayment.save();
      console.log("Payment saved successfully:", newPayment); // Log payment creation
  
      res.status(200).json({ message: "Order and payment saved successfully", orderId: newOrder._id });
    } catch (error) {
      console.error("Error saving order and payment:", error); // Log errors
      res.status(500).json({ message: "Error saving order and payment", error: error.message });
    }
  });

module.exports = router;
