require('dotenv').config();
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


async function getChatbotResponse(userInput) {
  try{
    const chatCompletion = await openai.chat.completions.create({
      model:"gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful customer support chatbot." },
        { role: "user", content: userInput },
      ],
    });


    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);

    if(error.response) {
      const status = error.response.status;

      switch (status) {
        case 401: 
          return "Invalid API key. Please check your API key and try again.";
        case 429: 
          return "Rate limit exceeded. Please wait and try again.";
        case 500:
        case 502:
        case 503: 
        case 504:
          return "OpenAI servers are currently down. Please try again later";
        default:
          return `Sorry, there was an error communicating with the server (Status: ${status}. Please try again.`
      }
    } else if (error.request) {
      console.log("No response received:", error.request);
      // The request was made but no response was received
      return "Sorry, I'm having trouble connecting. Please check your internet connection and try again.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during request setup:", error.message);
      return "Sorry, an unexpected error occurred. Please try again later.";
    }
  }

}



// Rate Limits
const delay = (ms) => new  Promise((res) => setTimeout(res, ms));


async function getChatbotResponseWithRetry(userInput, retries = 3) {
  try{
    return await getChatbotResponse(userInput);
  } catch (error) {
   if (error.response && error.response.status === 429 && retries > 0) {
    //Rate Limits exceeded
    const retryAfter = error.response.headers['retry-after'] || 1;  // Get retry-after header or default to 1 second
    console.warn(`Rate limit exceeded. Retrying in ${retryAfter} seconds... (Retries left: ${retries})`);
    await delay (retryAfter * 1000); // Wait before retrying
    return getChatbotResponseWithRetry(userInput, retries - 1); //Retry
   } else {
    // Other error or no more retries
    throw error; // Re-throw the error to be handled by the main function
   }
  }
}



async function main() {
try {
  const userMessage = "What are your hours of operation?";
  const ChatbotResponse = await getChatbotResponseWithRetry(userMessage);
  console.log("User:", userMessage);
  console.log("Chatbot:", ChatbotResponse);
} catch (error) {
  console.error("Final error:", error);
  // Handle the error appropriately, e.g., display a generic error message to the user
}
}







