import { NextApiHandler } from 'next';
import { createMealPlan, createQuery } from '@/utils/supabase-admin';
import { createServerSupabaseClient, getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { query } = await req.json();
      console.log('saving', query);
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const response = await createQuery(query, session.user.id);
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
