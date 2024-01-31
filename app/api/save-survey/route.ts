import { SurveyResponse } from '@/types';
import { createSurveyResponse } from '@/utils/supabase-admin';
import { getSession } from '@/app/supabase-server';
export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const session = await getSession();
      const { values } = await req.json();
      if (!session) {
        return new Response(JSON.stringify('Unauthorized'), {
          status: 401
        });
      }
      const surveyResponse: SurveyResponse = {
        id: '',
        user_id: session?.user.id,
        response: values
      };
      const data = await createSurveyResponse(surveyResponse);
      return new Response(JSON.stringify(data), {
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
