
import { NextApiHandler } from 'next'
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handler: NextApiHandler = async (req, res) => {
    const { totalCalories, numOfMeals } = req.query;
    let breakDownJson = ``


    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (numOfMeals === 1) {
        breakDownjson = `{
        "breakdown": {
            "dinner": 0,
        }
    }`} else if (numOfMeals === 2) {
        breakDownjson = `{
        "breakdown": {
            "lunch": 0,
            "dinner": 0,
        }
    }`
    } else if (numOfMeals === 3) {
        breakDownjson = `{
        "breakdown": {
            "breakfast": 0,
            "lunch": 0,
            "dinner": 0,
        }
    }`
    } else if (numOfMeals === 4) {
        breakDownjson = `{
        "breakdown": {
            "breakfast": 0,
            "lunch": 0,
            "dinner": 0,
            "snack1": 0,
        }
    }`
    } else if (numOfMeals === 5) {
        breakDownjson = `{
        "breakdown": {
            "breakfast": 0,
            "lunch": 0,
            "snack1": 0,
            "dinner": 0,
            "snack2": 0
        }
    }`
    } else if (numOfMeals === 6) {
        breakDownjson = `{
        "breakdown": {
            "breakfast": 0,
            "snack1": 0,
            "lunch": 0,
            "snack2": 0,
            "dinner": 0,
            "snack3": 0,
        }
    }`
    }

    const userQuery = `Generate a breakdown of ${totalCalories} calories distributed amongst different meals. Respond only in JSON format as follows: ${breakDownJson}`;

    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });
        const text = chatResponse.data.choices[0].message.content;

        if (typeof text !== 'string') {
            return res.status(500).json({ message: 'API Error' });
        }

        return res.status(200).json({ breakDownJson });
    } catch (error) {
    }
}

export default handler;