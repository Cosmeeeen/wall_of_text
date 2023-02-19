import React from 'react';

import NewPost from './NewPost';
import Post from './Post';

const mockPosts = [
  {
    text: 'Hello World!',
    date: '25.09.2001',
    user: 'Cosmeen'
  },
  {
    text: 'This is a loger post. The quick brown fox jumps over the lazy dog 123',
    date: '25.12.2019',
    user: 'NewUser'
  },
  {
    text: 'a',
    date: '12.12.2012',
    user: 'TestUserName'
  }
];

const PostList = () => {
  const [posts, setPosts] = React.useState(mockPosts);

  const addPostCb = React.useCallback(
    ({ user, text }) => {
      const newPost = { text, user };
      setPosts([newPost, ...posts]);
    },
    [posts]
  );

  return (
    <div className='h-fit w-1/3'>
      <NewPost addPostCb={addPostCb} />
      {posts.map((post, index) => (
        <Post text={post.text} date={post.date} user={post.user} key={index} />
      ))}
    </div>
  );
};

export default PostList;
