import { NextApiHandler } from 'next';
import { createMealPlan } from '@/utils/supabase-admin';
import { createServerSupabaseClient, getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { createdMealPlan } = await req.json();
      console.log(createdMealPlan);
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      createdMealPlan.owner = session.user.id;
      const status = await createMealPlan(createdMealPlan);
      if (status) {
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
