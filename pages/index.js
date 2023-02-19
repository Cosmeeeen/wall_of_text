import React from 'react';

import PostList from '../components/PostList';

const App = () => {
  return (
    <div className='flex h-fit min-h-screen w-screen flex-col items-center justify-start bg-neutral-900 py-12 text-gray-100'>
      <PostList />
    </div>
  );
};

export default App;
