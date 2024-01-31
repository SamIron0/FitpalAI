import { getSession } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import SignInAuthUI from './SignInAuthUI';

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    const urlParams = new URLSearchParams(window.location.search);
    const next = urlParams.get('next') || '/';
    window.location.href = next;
  }
  return <SignInAuthUI />;
}
