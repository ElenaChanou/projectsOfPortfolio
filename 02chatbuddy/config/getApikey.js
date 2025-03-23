const apiKey = process.env.API_KEY;

if (apiKey) {
    console.log("API Key:", apiKey);
} else {
    console.log("API Key is not set. Please ensure the envirenment variable is defined");
}