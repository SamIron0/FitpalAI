import { useRouter } from 'next/navigation';

import Link from 'next/link';
//import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';

import s from './Navbar.module.css';
import logo from "../../../logo.png";
import Image from "next/image";

export default async function Navbar() {
  //const router = useRouter();

  //const supabase = createServerSupabaseClient();
  //const {
  //data: { user }
  //} = await supabase.auth.getUser();

  function handleButtonClick(): void {

  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Link href="/" rel="nofollow">
          <Image className="h-[32px] pl-4 sm:pl-6 md:h-[42px]" src={logo.src} alt="logo" />
        </Link>

      </div>
      <div className="flex items-center pr-4 sm:pr-6 justify-end space-x-2">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Link
            href="/signin"
            className="group flex rounded-md px-4 py-2 text-[13px] font-semibold transition-all items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            Get Started
          </Link>
        )}

      </div>
    </header >
  );
};