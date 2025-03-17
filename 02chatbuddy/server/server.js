
const express = require('express');
const app = express();
const port = 3000;

//Define a route for the root path
app.get('/', (req, res) => {
    res.json({ message:'Hello World!' });
});

app.get('/chatbot', (req, res) => {
    res.send('Welcome to the Chatbot API!');
});

app.get('/users/:userId/:userName', (req, res) => {
    const userId = req.params.userId;
    const userName = req.params.userName;
    res.send(`User ID: ${userId}`);
});

app.get('/about', (req, res) => {
    res.send('This is a simple chatbot API built with Express!')
})

//Star the server
app.listen(port, () =>{
    console.log(`Server listening on port ${port} `);
});