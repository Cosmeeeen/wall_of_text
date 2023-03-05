import React from 'react';
import axios from 'axios';

import NewPost from './NewPost';
import Post from './Post';

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = React.useState(initialPosts);
  const [loadingNewPost, setLoadingNewPost] = React.useState(false);

  const addPostCb = React.useCallback(
    ({ text }) => {
      setLoadingNewPost(true);
      const newPost = { text };
      axios
        .post('/api/posts', newPost)
        .then(res => {
          setPosts([res.data, ...posts]);
          setLoadingNewPost(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingNewPost(false);
        });
    },
    [posts]
  );

  return (
    <div className='h-fit w-full max-w-xl'>
      <NewPost addPostCb={addPostCb} canPost={true} loading={loadingNewPost} />
      {posts?.length ? (
        posts.map(post => <Post text={post.text} createdAt={post.createdAt} key={post.id} />)
      ) : (
        <h1>no posts</h1>
      )}
    </div>
  );
};

export default PostList;
