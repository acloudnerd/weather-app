import 'dotenv/config';
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "✅ Yes" : "❌ No");

export async function handler(event){
    try{
        const {temperature, weatherCondition, occasion, day} = JSON.parse(event.body);

        const prompt = `Based on the following conditions:
        - Temperature: ${temperature} °C
        - Weather: ${weatherCondition}
        - Occasion: ${occasion}
        - Day of the week: ${day}
        Suggest what outfit someone should wear. Be concise and practical.`;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}],
        });

        const suggestion = response.choices[0].message.content;
        return{
            statusCode: 200,
            body: JSON.stringify({suggestion}),
        };
    }catch (error){
        console.error("AI Function Error:", error);
        return{
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    
    }

}

