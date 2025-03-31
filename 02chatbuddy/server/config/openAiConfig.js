require('dotenv').config();
const  OpenAI =  require('openai');

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
      //The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Status Code:", error.response.status);
      console.error("Data:", error.response.data);
      return`Sorry, there was an error communicating with the server(Status: ${error.response.status}). Please try again later.`;
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


async function main() {
  const userMessage = "What are your hours of operation?";
  const ChatbotResponse = await getChatbotResponse(userMessage);
  console.log("User:", userMessage);
  console.log("Chatbot:", getChatbotResponse);
}