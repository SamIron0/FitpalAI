
import { NextApiHandler } from 'next'
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { calories, ingredients, userLocation, allergy } = req.query;
    const userQuery = calories ? ingredients != "" ? allergy != "" ? `Step 1: I have ${ingredients}  in my pantry but im very willing to buy more ingredients, out of those, select only the ones most commonly used to make breakfast. Step 2: Please select one common popular breakfast recipe with ${calories} calories based on already existing cookbook articles that may or may not contain some of the pantry ingredients, Staying within a 5 calorie range of the total. . Do not include anything that contains ${allergy}. User is located in ${userLocation} Deliver in JSON format: {title: string;  calories: number}`
        : `Step 1: I have ${ingredients}  in my pantry but im very willing to buy more ingredients, out of those, select only the ones most commonly used to make breakfast. Step 2: Please select one common popular breakfast recipe with ${calories} calories based on already existing cookbook articles that may or may not contain some of the pantry ingredients, Staying within a 5 calorie range of the total. Deliver in JSON format: {title: string;  calories: number}`
        : `Please select one common popular breakfast recipe with ${calories} calories based on already existing cookbook articles, Staying within a 5 calorie range of the total. Deliver in JSON format: {title: string; calories: number}`
        : `Please select one common popular breakfast recipe based on already existing cookbook articles. Deliver in JSON format: {title: string; calories: number}`
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