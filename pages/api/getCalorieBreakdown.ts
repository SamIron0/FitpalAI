
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

    if (numOfMeals === "1") {
        breakDownJson = `{
        "breakdown": {
            "dinner": number,
        }
    }`} else if (numOfMeals === '2') {
        breakDownJson = `{
        "breakdown": {
            "lunch": number,
            "dinner": number,
        }
    }`
    } else if (numOfMeals === "3") {
        breakDownJson = `{
        "breakdown": {
            "breakfast": number,
            "lunch": number,
            "dinner": number,
        }
    }`
    } else if (numOfMeals === "4") {
        breakDownJson = `{
        "breakdown": {
            "breakfast": number,
            "lunch": number,
            "dinner": number,
            "snack1": number,
        }
    }`
    } else if (numOfMeals === "5") {
        breakDownJson = `{
        "breakdown": {
            "breakfast": 0,
            "lunch": 0,
            "snack1": 0,
            "dinner": 0,
            "snack2": 0
        }
    }`
    } else if (numOfMeals === '6') {
        breakDownJson = `{
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
    

    const userQuery = `Generate a breakdown of ${totalCalories} calories  according to given json. Respond only in JSON format as follows: ${breakDownJson} and remove any newline characters that might occur`;

    try {
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });
        const text = chatResponse.choices[0].message.content;

        if (typeof text !== 'string') {
            return res.status(500).json({ message: 'API Error' });
        }

        return res.status(200).json({ text });
    } catch (error) {
        console.log(error)
    }
}

export default handler;