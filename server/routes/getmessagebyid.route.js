const express = require('express');
const Message = require('../Database/models/message');

const router = express.Router();

router.get('/:content', async (req, res) => {

    try {
        const message = await Message.findOne({ message: req.params.content }); 

        if (!message) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No message found for the user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                message
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

module.exports = router;
