import { cookies, headers } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { stripe } from "@/utils/stripe";
import {
  createOrRetrieveCustomer,
  createOrRetrieveMealPlan,
  createOrRetrieveWaitListContact,
} from "@/utils/supabase-admin";
import { getURL } from "@/utils/helpers";
import { Database } from "@/types_db";
import { MealPlan } from "@/types";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // 1. Destructure the price and quantity from the POST body
      const { userName, userEmail } = await req.json();
      const response = await createOrRetrieveWaitListContact(
        userName,
        userEmail
      );

      return new Response(JSON.stringify(response), {
        status: 200,
      });
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
