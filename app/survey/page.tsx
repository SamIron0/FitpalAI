import { redirect } from 'next/navigation';
import { getSession } from '../supabase-server';
import { SurveyUI } from './SurveyUI';

export default async function Survey() {
  const session = await getSession();
  return (
    <div className="flex items-center w-full justify-center">
      <SurveyUI user={session?.user} />
    </div>
  );
}
