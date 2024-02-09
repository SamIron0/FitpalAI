import SupabaseProvider, { useSupabase } from './supabase-provider';
import { IoClose } from 'react-icons/io5';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { PropsWithChildren } from 'react';
import 'styles/global.css';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '@/components/ui/Sidebar';
import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { getSession } from './supabase-server';
import ToasterProvider from './providers/ToasterProvider';
import { cn } from '@/lib/utils';
import { SidebarProvider } from './providers/SideBarContext';
import { UserDetailsProvider } from './providers/UserDetailsContext';
const meta = {
  title: 'Fitpal AI',
  description: 'Meal plans and calorie tracking.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://fitpalai.com',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};
function Announcement() {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
          Enter your details in the preferences tab to create personalized
          plans.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Go now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <IoClose className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DM7XC7YDQT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DM7XC7YDQT');
              `
          }}
        ></script>
      </head>
      <body className="dark">
        <SupabaseProvider>
          <ToasterProvider />
          <SidebarProvider>
            <UserDetailsProvider>
              <div className={cn('bg-background text-foreground')}>
                {session?.user.email ? (
                  <>
                    <div className="flex">
                      <Sidebar session={session} /> {children}
                    </div>
                  </>
                ) : (
                  <div>
                    <Navbar />
                    {children}
                  </div>
                )}
              </div>
              <Analytics />
            </UserDetailsProvider>
          </SidebarProvider>
        </SupabaseProvider>
      </body>
    </>
  );
}
