import { useRouter } from 'next/navigation';

import Link from 'next/link';
//import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';

import s from './Navbar.module.css';
import logo from "../../../logo.png";
import Image from "next/image";

export default async function Navbar() {
  const router = useRouter();

  //const supabase = createServerSupabaseClient();
  //const {
  //data: { user }
  //} = await supabase.auth.getUser();

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
              <Image className="h-[40px] md:h-[50px]" src={logo.src} alt="logo" />
            </Link>

          </div>


          <div className="flex flex-1 items-center justify-end space-x-8">
            
              Get Started
          </div>
        </div>
      </div>
    </nav >
  );
};