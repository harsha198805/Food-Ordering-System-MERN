const express = require('express');
const router = express.Router();
const verifyAdmin = require('../Middleware/verifyAdmin'); // Adjust the path as needed

router.get('/admin/dashboard', verifyAdmin, (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;

