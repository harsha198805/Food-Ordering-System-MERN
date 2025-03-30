const express = require('express');
const Message = require('../Database/models/message');

const router = express.Router();

// Adjust the route to match the frontend's Axios call
router.put('/:id', async (req, res) => {
  try {
      const updateMessage = await Message.findByIdAndUpdate(
          req.params.id,
          { message: req.body.message }, // Use 'message' to match the frontend's request body
          { new: true, runValidators: true }
      );
    
      if (!updateMessage) {
          return res.status(404).json({
              status: 'Failed',
              message: 'No message found with that ID'
          });
      }

      res.status(200).json({
          status: 'success',
          msg: updateMessage
      });
  } catch (err) {
      res.status(500).json({
          status: 'Failed',
          message: err.message // Provide a more descriptive error message
      });
  }
});


module.exports = router