import { useRouter } from "next/navigation";

import Link from "next/link";
import s from "./Navbar.module.css";
import Image from "next/image";
import { getSession } from "@/app/supabase-server";

export default async function Navbar() {
  //const router = useRouter();

  //const supabase = createServerSupabaseClient();
  //const {
  //data: { user }
  //} = await supabase.auth.getUser();
  //const session = await getSession();

  function handleButtonClick(): void {}

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16  border-[#232325] border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex pl-3 pt-1.5 lg:pl-48 items-center">
        <Link href="/" rel="nofollow">
          <img
            className="h-[110px]  md:h-[120px]"
            src="/logo.svg"
            alt="logo"
          ></img>
        </Link>
      </div>
      <div className="flex items-center pr-3 lg:pr-48 justify-end space-x-2">
        <Link
          href="/signin"
          className="group flex rounded-md px-4 py-2 text-[13px] font-semibold transition-all items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
          style={{
            boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
          }}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
