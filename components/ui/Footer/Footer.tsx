import Link from 'next/link';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-2 bg-zinc-900">
     
      <div className="flex items-center justify-between py-6 space-y-4 flex-row bg-zinc-900">
        <div>
          <span>
            &copy; {new Date().getFullYear()} FitpalAI. </span>
        </div>
        <div className="">
          <a className="" href="https://twitter.com" aria-label="twitter link">
            <img
              src="/x-logo.svg"
              alt="twitter"
              className="inline-block h-8 text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
