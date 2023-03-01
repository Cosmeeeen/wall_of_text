import React from 'react';
import { prisma } from '../server/db/client';

import PostList from '../src/PostList';

export async function getServerSideProps() {
  const messages = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return {
    props: {
      initialPosts: JSON.parse(JSON.stringify(messages))
    }
  };
}

const App = ({ initialPosts }) => {
  return (
    <div className='flex h-fit min-h-screen w-screen flex-col items-center justify-start bg-neutral-900 py-12 text-gray-100'>
      <PostList initialPosts={initialPosts} />
    </div>
  );
};

export default App;
