import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import chatRoutes from './routes/chat.js';  // Πρέπει να συμπεριλάβεις την επέκταση .js

config(); 

const app = express();
const port = 3000;

app.use(json());

connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB', err));

app.use('/chat', chatRoutes);  // Εδώ χρησιμοποιείς το chatRoutes

app.get('/hello', (req, res) => {
  res.send('Hello, I am ChatAi!');
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});