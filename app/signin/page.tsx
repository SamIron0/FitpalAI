import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import logo from "../../../logo.png";

export default async function SignIn() {
  //const session = await getSession();
  //if (session) {
  //const user = session?.user;
  redirect(`https://chat.fitpalai.com`);
  // }
  /*
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
  
          <AuthUI />
        </div>
      </div>
    );
    */
}
