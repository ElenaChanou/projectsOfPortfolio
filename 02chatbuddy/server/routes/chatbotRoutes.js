const express = require('express');
const router = express.Router();
const Message = require('../models/message'); // Εισάγουμε το μοντέλο του μηνύματος

// Διαδρομή για την αποστολή μηνύματος από τον χρήστη
router.post('/', (req, res) => {
  const userMessage = req.body.user_message;
  console.log(`Received message: ${userMessage}`);

  // Αποθήκευση του μηνύματος του χρήστη
  const newMessage = new Message({
    sender: 'User',
    message: userMessage
  });

  newMessage.save()
    .then(() => console.log('✅ User message saved to MongoDB'))
    .catch((err) => console.error('❌ Could not save the user message', err));

  // Απάντηση από το ChatAi
  const chatbotResponse = `Hello user, nice to meet you. I am ChatAi`;

  res.json({ response: chatbotResponse });
});

module.exports = router;