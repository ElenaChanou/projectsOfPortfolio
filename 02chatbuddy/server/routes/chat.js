const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); 


router.post('/', (req, res) => {
  const userMessage = req.body.user_message;
  console.log(`Received message: ${userMessage}`);

 
  const newMessage = new Message({
    sender: 'User',
    message: userMessage,
    conversationId: conversationId
  });

  newMessage.save()
    .then(() => console.log('✅ User message saved to MongoDB'))
    .catch((err) => console.error('❌ Could not save the user message', err));

  
  const chatbotResponse = `Hello user, nice to meet you. I am ChatAi`;

  res.json({ response: chatbotResponse });
});

module.exports = router;