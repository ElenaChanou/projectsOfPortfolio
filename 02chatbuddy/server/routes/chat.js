const express = require('express');
const Message = require('../models/Message'); 

const router = express.Router();


router.post('/', (req, res) => {
  const userMessage = req.body.user_message;
  console.log(`Received message: ${userMessage}`);

 
  const newMessage = new Message({
    sender: 'User',
    message: userMessage,
    conversationId: conversationId
  });

  newMessage.save()
    .then(() => console.log('✅ Message saved successfully'))
    .catch((err) => console.error('❌ Could not save  message', err));

  
  const chatbotResponse = `Hello user, nice to meet you. I am ChatAi`;

  res.json({ response: chatbotResponse });
});


router.get('/:conversationId', (req, res) => {
  const{ conversationId } = req.params;

  Message.find( {conversationId })
  .then( message => {
    if (messages.length > 0) {
      res.json({ messages });
    } else {
      res.status(404).json({ message: 'No messages found for this conversationId' });
    }
  })
  .catch((err) => {
    console.error('❌ Error retrieving messages', err);
    res.status(500).json({ message: 'Server error' })
  });
});
module.exports = router;