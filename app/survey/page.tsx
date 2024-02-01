import { redirect } from 'next/navigation';
import { getSession, getUserDetails } from '../supabase-server';
import { SurveyUI } from './SurveyUI';
import { isSurveyComplete } from '@/utils/supabase-admin';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function Survey() {
  const session = await getSession();
  //let details = {'user': null};
  if (session?.user) {
    const complete = await isSurveyComplete(session.user.id);
    if (complete) {
      return (
        <div className="flex items-center w-full pt-28 justify-center">
          <Card>
            <CardHeader>
              <h1 className="text-4xl font-bold text-center">
                Thank you for taking the survey! ⭐
              </h1>
            </CardHeader>
            <CardContent className='text-muted-foreground'>
              <p>We will be in touch</p>
            </CardContent>{' '}
          </Card>
        </div>
      );
    }
  } else {
    redirect('/signin');
  }
  return (
    <div className="flex items-center w-full justify-center">
      <SurveyUI user={session?.user} />
    </div>
  );
}
