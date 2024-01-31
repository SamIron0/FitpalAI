import { useRouter } from 'next/router';
import { getSession } from '../supabase-server';
import { SurveyUI } from './SurveyUI';

export default async function Survey() {
  const session = await getSession();
  const router  = useRouter();

  if (!session) {
    router.push(`/signin`)
  }
  return (
    <div className="flex items-center w-full p-4 justify-center">
      <SurveyUI user={session?.user} />{' '}
    </div>
  );
}
