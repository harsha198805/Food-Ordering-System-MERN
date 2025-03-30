const express = require('express');
const Message = require('../Database/models/message');

const router = express.Router();

router.get('/',async (req, res) => {
    const messages = await Message.find({})
    try{
        res.status(200).json({
            status:'success',
            data:{
                messages
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message: err.message 
    })
    }
})

module.exports = router