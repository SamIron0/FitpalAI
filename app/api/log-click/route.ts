import {
  logClick
} from '@/utils/supabase-admin';
import { getURL } from '@/utils/helpers';
import { Database } from '@/types_db';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { name } = await req.json();
      const response = await logClick(name);

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
