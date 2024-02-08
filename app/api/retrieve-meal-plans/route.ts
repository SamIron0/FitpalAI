import { getSession } from '@/app/supabase-server';
import { retrieveMealPlans } from '@/utils/supabase-admin';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { trackDate } = await req.json();
      let date = trackDate
      if (!trackDate) {
        date = new Date().toISOString().split('T')[0];
      }
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const mealplan = await retrieveMealPlans(session.user.id, date);
      return new Response(JSON.stringify(mealplan), {
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
