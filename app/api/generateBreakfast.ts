
import { NextApiHandler } from 'next'
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { calories, ingredients, userLocation, allergies } = req.query;
    // const days = calories === "3" ? "day5" : number === "2" ? "day3,day4" : "day1,day2";
    const userQuery = calories ? `Could you please provide a detailed lunch recipe title utilising ${ingredients} that falls within ${calories} calories? The meals should reflect a variety of cuisines and flavor profiles suitable for a user based in ${userLocation}. Also, ensure that each meal offers balanced nutrients. Kindly deliver the response in the following JSON format: { {title: string}, ingredients: string })`
        : `Could you please provide a detailed lunch recipe title utilising ${ingredients}? The meals should reflect a variety of cuisines and flavor profiles suitable for a user based in ${userLocation}. Also, ensure that each meal offers balanced nutrients. Kindly deliver the response in the following JSON format: { {title: string}, ingredients: string })`
    try {
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });
        const text = chatResponse.data.choices[0].message?.content;

        if (typeof text !== 'string') {
            return res.status(500).json({ message: 'API Error' });
        }

        return res.status(200).json({ "breakfast": JSON.parse(text) });
    } catch (error) {
    }
}

export default handler;