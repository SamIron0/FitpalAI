import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';
import { cn } from '@/lib/utils'
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


          <button
            className="group mt-8 rounded-md px-4 py-2 text-[10px] transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
              Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};