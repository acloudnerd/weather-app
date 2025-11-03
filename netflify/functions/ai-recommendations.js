import OpenAi from "openai";

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY, //secure key
});

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
        return{
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        }
    
    };

}

