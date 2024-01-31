import type { AppProps } from 'next/app'
import { SidebarProvider } from './providers/SideBarContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}