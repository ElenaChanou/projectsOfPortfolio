const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    console.log(`Received Message: ${userMessage}`);

    const chatbotResponse = `You said ${userMessage}.I'm a simple chatbot`;
    res.json({ response: chatbotResponse });
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})