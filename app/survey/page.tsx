import { getSession } from '../supabase-server';
import { SurveyUI } from './SurveyUI';

export default async function Survey() {
  const session = await getSession();

  if (!session) {
    window.location.href = '/signin?next=' + window.location.pathname;
  }
  return (
    <div className="flex items-center w-full p-4 justify-center">
      <SurveyUI user={session?.user} />{' '}
    </div>
  );
}
