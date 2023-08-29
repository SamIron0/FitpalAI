
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
    let days = ""
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
    if (numOfMeals === "1") {
        days = `dinner (everything else remains at 0)`
    } else if (numOfMeals === '2') {
        days = `lunch,dinner (everything else remains at 0)`

    } else if (numOfMeals === "3") {
        days = `breakfast,lunch,dinner (everything else remains at 0)`

    } else if (numOfMeals === "4") {
        days = `breakfast,lunch,dinner,snack1 ( snack2 and snack3 remain at 0)`

    } else if (numOfMeals === "5") {
        days = `breakfast,lunch,dinner,snack1, snack2 (snack3 remains at 0)`

    } else if (numOfMeals === '6') {
        days = `breakfast,lunch,dinner,snack1, snack2, snack3`
    }


    const userQuery = `Generate a breakdown of ${totalCalories} calories spread accross ${days}. Respond only in JSON format as follows: ${breakDownJson}.`;

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