import { NextApiHandler } from 'next';
import { createOrRetrieveMealPlan } from '@/utils/supabase-admin';
import { createServerSupabaseClient, getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const session = await getSession();
      const { mealplan } = await req.json();
      console.log('plan',mealplan);
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }

      mealplan.owner = session.user.id;
      console.log('owner',mealplan.owner);

      const mealPlanId = createOrRetrieveMealPlan(mealplan);
      if (mealPlanId != undefined) {
        const response = 'Meal plan saved';
        return new Response(JSON.stringify(response), {
          status: 200
        });
      }
    } catch (err: any) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
