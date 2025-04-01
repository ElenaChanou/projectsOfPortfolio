import { Schema, model } from 'mongoose';
 

const messageSchema = new Schema({
  sender: String,
  message: String,
  conversationId: {type: String, required: true},
  timestamp: { type: Date, default: Date.now }
});


const message = model('Message', messageSchema);

export default message;