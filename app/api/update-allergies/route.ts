
export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { allergies } = await req.json();
      //const response = await updateAllergies(allergies);
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
