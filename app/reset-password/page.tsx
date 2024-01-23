import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import SignInAuthUI from './ResetPasswordAuth';
import ResetPasswordAuth from './ResetPasswordAuth';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    return redirect('/');
  }
  return <ResetPasswordAuth />;
}
