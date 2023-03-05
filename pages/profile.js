import { useSession, signIn, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { XMarkIcon } from '@heroicons/react/24/solid';

import { authOptions } from './api/auth/[...nextauth]';
import Head from 'next/head';

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='flex h-full flex-col items-center justify-center gap-4'>
      <Head>
        <title>Wall of Text - Profile</title>
      </Head>
      <XMarkIcon
        className='fixed top-3 left-4 aspect-square w-10 cursor-pointer'
        onClick={() => router.push('/')}
      />
      {session ? (
        <>
          <p>Welcome, {session.user.name}</p>
          <Image
            className='rounded'
            src={session.user.image}
            alt="User's profile photo"
            width={300}
            height={300}
            quality={100}
          />{' '}
          <p>{session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Please sign in to continue</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session
    }
  };
}
