import { getSession } from '@/app/supabase-server';
import { retrieveMealPlans } from '@/utils/supabase-admin';

export async function GET(req: Request) {
  if (req.method === 'GET') {
    try {
      const { trackDate }= await req.json();
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const mealplan = await retrieveMealPlans(session.user.id, trackDate);
      return new Response(JSON.stringify(mealplan), {
        status: 200
      });
    } catch (err: any) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'GET' },
      status: 405
    });
  }
}
