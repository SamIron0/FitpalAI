import SupabaseProvider, { useSupabase } from './supabase-provider';
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
            <div className={cn('bg-background text-primary-foreground')}>
              {session?.user.email === 'fitpalaicontact@gmail.com' ? (
                <div className="flex">
                  <Sidebar /> {children}
                </div>
              ) : (
                <div>
                  <Navbar />
                  {children}
                </div>
              )}
            </div>
          <Analytics />
        </SupabaseProvider>
      </body>
    </>
  );
}
