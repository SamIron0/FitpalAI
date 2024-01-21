import SupabaseProvider, { useSupabase } from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { PropsWithChildren } from 'react';
import 'styles/main.css';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from '@/components/ui/Sidebar';
import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
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
  //const session = await useSession();
 // const user = await supabase.auth.getSession();
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-39N664CG65"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-39N664CG65');
              `
          }}
        ></script>
      </Head>
      <body className="loading">
        <SupabaseProvider>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>

          <Analytics />
        </SupabaseProvider>
      </body>
    </>
  );
}
