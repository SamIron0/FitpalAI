
import { NextApiHandler } from 'next'
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { calories, ingredients, userLocation, allergies } = req.query;
    const userQuery = calories ? `Could you please provide a detailed lunch recipe title - utilising ${ingredients} - that falls within ${calories} calories? The meals may reflect a variety of cuisines and flavor profiles suitable for a user based in ${userLocation}. Kindly deliver the response in the following JSON format: { {title: string}, ingredients: string })`
        : `Could you please provide a detailed dinner recipe title utilising ${ingredients}? The meals should reflect a variety of cuisines and flavor profiles suitable for a user based in ${userLocation}. Kindly deliver the response in the following JSON format: { {title: string}, ingredients: string })`
    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });
        //const text = chatCompletion.data.choices[0].message.content;
        const text = chatResponse.choices[0].message.content;

        if (typeof text !== 'string') {
            return res.status(500).json({ message: 'API Error' });
        }

        return res.status(200).json({ "meal": JSON.parse(text) });
    } catch (error) {
    }
}

export default handler;