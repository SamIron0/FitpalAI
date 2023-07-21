import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";
import {
    createOrRetrieveWaitListContact
  } from '@/utils/supabase-admin';

const saveWaitListContact: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const { userName, userEmail} = req.body;
        try {
            const waitlistContactId = createOrRetrieveWaitListContact(userName,userEmail);
            if(waitlistContactId != undefined){
                const response = "Meal plan saved";
                res.status(200).json(response);
            }
            
        } catch (err: any) {
            console.log(err);
            res.status(500).json({ error: { statusCode: 500, message: err.message } });
        }
    } else {
        res.status(401).end('Method Not Allowed');

    }
}
export default saveWaitListContact;