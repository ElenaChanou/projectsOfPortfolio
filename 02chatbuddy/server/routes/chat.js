import { Router } from 'express';

import Message from '../models/message.js';  

const router = Router();

router.post('/', (req, res) => {
  const { user_message, conversationId } = req.body; // Αποκτάς το conversationId από το σώμα του αιτήματος
  console.log(`Received message: ${user_message}`);

  const newMessage = new message({
    sender: 'User',
    message: user_message,
    conversationId: conversationId, // Χρησιμοποιείς το conversationId από το σώμα του αιτήματος
  });

  newMessage.save()
    .then(() => console.log('✅ Message saved successfully'))
    .catch((err) => console.error('❌ Could not save message', err));

  const chatbotResponse = `Hello user, nice to meet you. I am ChatAi`;

  res.json({ response: chatbotResponse });
});

router.get('/:conversationId', (req, res) => {
  const { conversationId } = req.params; // Αποκτάς το conversationId από τις παραμέτρους του URL

  message.find({ conversationId }) // Χρησιμοποιείς το Message.find() για να ανακτήσεις τα μηνύματα
    .then((messages) => {
      if (messages.length > 0) {
        res.json({ messages });
      } else {
        res.status(404).json({ message: 'No messages found for this conversationId' });
      }
    })
    .catch((err) => {
      console.error('❌ Error retrieving messages', err);
      res.status(500).json({ message: 'Server error' });
    });
});

export default router;