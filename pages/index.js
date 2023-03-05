import { getServerSession } from 'next-auth';
import Head from 'next/head';
import React from 'react';
import { prisma } from '../server/db/client';

import PostList from '../src/PostList';
import ProfileCircle from '../src/ProfileCircle';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const messages = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    props: {
      session,
      initialPosts: JSON.parse(JSON.stringify(messages))
    }
  };
}

const App = ({ initialPosts }) => {
  return (
    <>
      <ProfileCircle />
      <div className='flex h-fit min-h-screen w-screen flex-col items-center justify-start py-12'>
        <PostList initialPosts={initialPosts} />
      </div>
    </>
  );
};

export default App;
