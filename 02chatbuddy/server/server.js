const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat'); 

dotenv.config(); 

const app = express();
const port = 3000;


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB', err));


app.use('/chat', chatRoutes);


app.get('/hello', (req, res) => {
  res.send('Hello, I am ChatAi!');
});


app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});