import { createSurveyResponse } from '@/utils/supabase-admin';
export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { values } = await req.json();
      const response = await createSurveyResponse(values);
      return new Response(JSON.stringify(response), {
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
