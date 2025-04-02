const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../Database/models/Order"); // Ensure you have the Order model

const router = express.Router();

// Endpoint to create Stripe checkout session
router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, totalAmount, customerDetails } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:3000/confirmation?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ sessionId: session.id });

        // Save Order to Database AFTER Payment is successful
        const newOrder = new Order({
            items,
            paymentDetails: {
                paymentMethod: "Stripe",
                status: "Paid",
                transactionId: session.id,
            },
            customerDetails,
            totalAmount,
            status: "Paid",
        });

        await newOrder.save();
        console.log("Order saved successfully:", newOrder);

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

// Endpoint to confirm payment and retrieve order details
router.post("/confirm-payment", async (req, res) => {
    const { sessionId } = req.body;

    try {
        // Retrieve the session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Retrieve the order from your database using the session ID (if stored)
        const order = await Order.findOne({ "paymentDetails.transactionId": sessionId });

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        // Send order details back to the frontend
        res.json(order);
    } catch (error) {
        console.error("Error fetching payment session:", error);
        res.status(500).json({ error: "Failed to fetch payment session" });
    }
});

module.exports = router;
