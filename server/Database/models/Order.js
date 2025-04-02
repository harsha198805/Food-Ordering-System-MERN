const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{ 
        name: String, 
        price: Number, 
        quantity: Number 
    }],
    paymentDetails: {
        paymentMethod: String,
        status: String,
        transactionId: String,
    },
    customerDetails: {
        name: String,
        email: String,
    },
    totalAmount: Number,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
