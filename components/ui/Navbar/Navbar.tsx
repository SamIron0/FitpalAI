import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';
import { Button, buttonVariants } from '@/components/ui/button'
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


          <div className="flex flex-1 items-center justify-end space-x-8">
            <a
              href="/signin"
              className={cn(buttonVariants())}
            >
              <span className="">Get Started</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};