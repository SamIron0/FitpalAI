import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';

import s from './Navbar.module.css';
import logo from "../../../logo.png";
import Image from "next/image";

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  function handleButtonClick(): void {

  }

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" >
              <Image className="h-[50px] md:h-[60px]" src={logo.src} alt="logo" />
            </Link>

          </div>


          <div className="flex flex-1 items-center justify-end space-x-8">
            <button
              className="w-[87px] flex  justify-center items-center h-[35px] bg-transparent border-[1px] border-blue-500 rounded-md"
            >
              <Link href="/signin" className="active:scale-95 items-center cursor-pointer text-zinc-200 rounded-md p-1 font-medium scale-100 duration-75">
                Waitlist
              </Link>

            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};