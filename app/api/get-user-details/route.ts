import { SurveyResponse } from '@/types';
import { createSurveyResponse } from '@/utils/supabase-admin';
import { getSession } from '@/app/supabase-server';
import { getUserDetails } from '@/utils/supabase-admin';
export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const session = await getSession();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const userDetails = await getUserDetails(session?.user?.id || '1');
      return new Response(JSON.stringify(userDetails), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
