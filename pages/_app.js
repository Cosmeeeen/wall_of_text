import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../global.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <div className='h-full'>
      <Head>
        <title>Wall of Text</title>
      </Head>
      <SessionProvider session={session}>
        <Analytics />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
};

export default MyApp;
