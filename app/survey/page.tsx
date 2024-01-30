import { getSession } from '../supabase-server';
import { SurveyUI } from './SurveyUI';

export default async function Survey() {
  const session = await getSession();
  if (!session) {
      // if user has filled survey display thank you screeen

  }
  return <SurveyUI user={session?.user} />;
}
