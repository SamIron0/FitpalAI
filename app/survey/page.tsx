import { redirect } from 'next/navigation';
import { getSession, getUserDetails } from '../supabase-server';
import { SurveyUI } from './SurveyUI';
import { isSurveyComplete } from '@/utils/supabase-admin';

export default async function Survey() {
  const session = await getSession();
  //let details = {'user': null};
  if (session?.user) {
    const complete = await isSurveyComplete(session.user.id);
    if (complete) {
      <div className="flex items-center w-full p-18 justify-center">
        <h1 className="text-4xl font-bold text-center">
          Thank you for taking the survey!
        </h1>
      </div>;
    }
  }
  return (
    <div className="flex items-center w-full justify-center">
      <SurveyUI user={session?.user} />
    </div>
  );
}
