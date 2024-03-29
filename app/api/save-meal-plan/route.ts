import { NextApiHandler } from 'next';
import { createMealPlan } from '@/utils/supabase-admin';
import { createServerSupabaseClient, getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { mealplan } = await req.json();
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      mealplan.owner = session.user.id;
      const status = await createMealPlan(mealplan);
      const response = 'Meal plan saved';
      return new Response(JSON.stringify(response), {
        status: 200
      });
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
