import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { PropsWithChildren } from 'react';
import ToasterProvider from './providers/ToasterProvider';
import SupabaseProvider from './supabase-provider';
import { Analytics } from '@vercel/analytics/react';
export default function RootLayout({ children }: PropsWithChildren) {
 
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
      <body className="loading">
        <SupabaseProvider>
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] bg-black md:min-h[calc(100dvh-5rem)]"
          >
            <ToasterProvider />
            <div>
              {false ? (
                <div className="flex">
                  <Sidebar /> {children}
                </div>
              ) : (
                <div>
                  <Navbar /> {children}
                </div>
              )}
            </div>
          </main>
          <Analytics />
        </SupabaseProvider>
      </body>
    </>
  );
}
