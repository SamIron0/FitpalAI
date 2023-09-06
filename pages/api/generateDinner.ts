
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
    let userQuery;

    if (calories && ingredients !== "" && allergy !== "") {
        userQuery = `I have ${ingredients} in my pantry, out of those, note only the ones most commonly used to make dinner. Please select one common popular dinner recipe with ${calories} calories based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe, Staying within a 5 calorie range of the total. Do not include anything that contains ${allergy}.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;
    } else if (calories && ingredients !== "") {
        userQuery = `Step 1: I have ${ingredients}  in my pantry, out of those, select only the ones most commonly used to make dinner. Please select one common popular dinner recipe with ${calories} calories based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe, Staying within a 5 calorie range of the total. Deliver in JSON format: {title: string; calories: number}`;
    } else if (calories && allergy !== "") {
        userQuery = ` Please select one common popular dinner recipe with ${calories} calories based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe, Staying within a 5 calorie range of the total. Do not include anything that contains ${allergy}.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;
    }else if (allergy !== "" && ingredients !== "") {
        userQuery = ` I have ${ingredients}  in my pantry, out of those, select only the ones most commonly used to make dinner. Please select one common popular dinner recipe based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe. Do not include anything that contains ${allergy}.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;
    }else if (allergy !== "" ) {
        userQuery = ` Please select one common popular dinner recipe based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe. Do not include anything that contains ${allergy}.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;
    } else if (ingredients !== "") {
        userQuery = ` I have ${ingredients}  in my pantry, out of those, select only the ones most commonly used to make dinner. Please select one common popular dinner recipe that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;

    }
    else if (calories) {
        userQuery = ` Please select one common popular dinner recipe with ${calories} calories based on already existing cookbook articles that may or may not have some of the pantry ingredients listed as an ingredient of the dinner recipe, Staying within a 5 calorie range of the total.The person cooking is located in ${userLocation}. Deliver in JSON format: {title: string; calories: number}`;

    }
    


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