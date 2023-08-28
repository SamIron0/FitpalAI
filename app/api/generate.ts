
import { NextApiHandler } from 'next'
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { number, userLocation } = req.query;
    const context = "Reply only in json format and remove all newline characters that may exist in the json.";
    const interfaceDetails = `follow this interface to construct the json {[day: string]:{breakfast: {item: string;};lunch: {item: string;};dinner: {item: string;  }; snack: {item: string;};totalCalories: string;};}`;
    const days = number === "3" ? "day5" : number === "2" ? "day3,day4" : "day1,day2";
    const userQuery = `${context}. Generate a detailed meal plan for ${days} that includes nutritious and tasty breakfasts, lunches, dinners, as well as snacks daily  for a user located in ${userLocation}. Make sure to incorporate a variety of protein sources, fruits, vegetables, whole grains. Also, try to include a variety of cuisines and flavor profiles to keep the meals interesting, like Mediterranean, Asian, Mexican, etc. Special attention should be given to ensuring a balance of nutrients in each meal. ${interfaceDetails}`;

    try {
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
        });
        const text = chatResponse.data.choices[0].message?.content;

        if (typeof text !== 'string') {
          return res.status(500).json({ message: 'API Error' });
        }

        return res.status(200).json({ "plan": JSON.parse(text) });
    } catch (error) {
    }
}

export default handler;