import { upsertUserDetails } from '@/utils/supabase-admin';
import { getSession } from '@/app/supabase-server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { userDetails } = await req.json();
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const status = await upsertUserDetails(userDetails);
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
