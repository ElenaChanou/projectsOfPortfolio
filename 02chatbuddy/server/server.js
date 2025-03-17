const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello World!")
}) 


app.post('/chat', (req, res) => {
    const userMessage = req.body.user_message;
    console.log(`Received Message: ${userMessage}`);

    const chatbotResponse = `You said ${userMessage}.Hello my friend, I am the chatBuddy`;
    res.json({ response: chatbotResponse });
})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})