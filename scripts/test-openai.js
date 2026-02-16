require('dotenv').config();
const { OpenAI } = require('openai');

async function testOpenAI() {
    console.log("Starting OpenAI API Connection Test...");
    console.log("Checking for OPENAI_API_KEY...");

    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ Error: OPENAI_API_KEY is missing in .env file.");
        process.exit(1);
    }

    console.log("✅ API Key found. Initializing OpenAI client...");

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Test connection. Reply with 'OK'" }],
            max_tokens: 5,
        });

        console.log("✅ API Response:", response.choices[0].message.content);
        console.log("✨ OpenAI Connection Successful!");
    } catch (error) {
        console.error("❌ OpenAI API Error:", error.message);
        if (error.status === 401) {
            console.error("👉 Tip: Check if your API key is valid and not expired.");
        }
        process.exit(1);
    }
}

testOpenAI();
