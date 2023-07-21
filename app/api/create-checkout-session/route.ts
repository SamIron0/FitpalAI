import { cookies, headers } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer, createOrRetrieveMealPlan, createOrRetrieveWaitListContact } from '@/utils/supabase-admin';
import { getURL } from '@/utils/helpers';
import { Database } from '@/types_db';
import { MealPlan } from '@/types';

export async function POST(req: Request) {

  if (req.method === 'POST') {

    try {
      const testPlan: MealPlan = {
        "day1": {
          breakfast: {
            item: "Oatmeal",
            calories: "150"
          },
          lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
          },
          dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
          },
          snack: {
            item: "Green Smoothie",
            calories: "200"
          },
          totalCalories: "1150"
        },

        "day2": {
          breakfast: {
            item: "Oatmeal",
            calories: "150"
          },
          lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
          },
          dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
          },
          snack: {
            item: "Green Smoothie",
            calories: "200"
          },
          totalCalories: "1150"
        },
        "day3": {
          breakfast: {
            item: "Oatmeal",
            calories: "150"
          },
          lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
          },
          dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
          },
          snack: {
            item: "Green Smoothie",
            calories: "200"
          },
          totalCalories: "1150"
        },
        "day4": {
          breakfast: {
            item: "Oatmeal",
            calories: "150"
          },
          lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
          },
          dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
          },
          snack: {
            item: "Green Smoothie",
            calories: "200"
          },
          totalCalories: "1150"
        },
        "day5": {
          breakfast: {
            item: "Oatmeal",
            calories: "150"
          },
          lunch: {
            item: "Grilled Chicken Salad",
            calories: "350"
          },
          dinner: {
            item: "Steamed Salmon with veggies",
            calories: "450"
          },
          snack: {
            item: "Green Smoothie",
            calories: "200"
          },
          totalCalories: "1150"
        }
      }

      // 1. Destructure the price and quantity from the POST body
      const { userName,userEmail } = await req.json();
      const response = await createOrRetrieveWaitListContact(userName, userEmail);
      /*const nb = await createOrRetrieveCustomer({
        uuid:  '',
        email: ''
      });*/
      return new Response(JSON.stringify(response), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }

    //    try {
    // 2. Get the user from Supabase auth
    /*    const supabase = createRouteHandlerClient<Database>({cookies});
        const {
          data: { user }
        } = await supabase.auth.getUser();
  
        // 3. Retrieve or create the customer in Stripe
        const customer = await createOrRetrieveCustomer({
          uuid: user?.id || '',
          email: user?.email || ''
        });
  
        // 4. Create a checkout session in Stripe
        let session;
        if (price.type === 'recurring') {
          session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer,
            customer_update: {
              address: 'auto'
            },
            line_items: [
              {
                price: price.id,
                quantity
              }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
              trial_from_plan: true,
              metadata
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}/`
          });
        } else if (price.type === 'one_time') {
          session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer,
            customer_update: {
              address: 'auto'
            },
            line_items: [
              {
                price: price.id,
                quantity
              }
            ],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}/`
          });
        }
  
        if (session) {
          return new Response(JSON.stringify({ sessionId: session.id }), {
            status: 200
          });
        } else {
          return new Response(
            JSON.stringify({
              error: { statusCode: 500, message: 'Session is not defined' }
            }),
            { status: 500 }
          );
            }
          } catch (err: any) {
        console.log(err);
        return new Response(JSON.stringify(err), { status: 500 });
      }*/
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
