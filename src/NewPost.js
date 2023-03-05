import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { signIn, useSession } from 'next-auth/react';

const MAX_POST_LENGTH = 255;

const NewPost = ({ canPost, addPostCb, loading }) => {
  const { data: session } = useSession();
  const [postText, setPostText] = React.useState('');

  const handleChangePostText = React.useCallback(
    e => {
      if (postText.length <= MAX_POST_LENGTH) {
        setPostText(e.target.value);
      }
    },
    [postText]
  );

  const letterCount = React.useCallback(() => {
    return (
      <p className={`${postText.length >= MAX_POST_LENGTH && 'text-red-600'}`}>
        {`${postText.length}/${MAX_POST_LENGTH}`}
      </p>
    );
  }, [postText]);

  const handleAddPost = React.useCallback(() => {
    if (postText.trim().length === 0 || !session) return;
    addPostCb({ text: postText.trim() });
    setPostText('');
  }, [addPostCb, postText, session]);

  if (!canPost)
    return (
      <div className='m-3 flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-800 p-4 text-center'>
        <p>You already posted today!</p>
        <p>Come back tomorrow in order to post again</p>
      </div>
    );

  if (loading)
    return (
      <div className='m-3 flex flex-col items-center justify-center rounded-xl bg-neutral-800 p-4'>
        <ArrowPathIcon className='h-12 w-12 animate-spin' />
      </div>
    );

  if (!session) {
    return (
      <div className='m-3 flex flex-col items-center justify-center rounded-xl bg-neutral-800 p-4'>
        <h1>
          Please{' '}
          <a className='cursor-pointer underline' onClick={() => signIn()}>
            log in
          </a>{' '}
          to post
        </h1>
      </div>
    );
  }

  return (
    <div className='m-3 grid grid-cols-2 gap-2 rounded-xl bg-neutral-800 p-4'>
      <textarea
        placeholder='Write your new post here...'
        maxLength={MAX_POST_LENGTH}
        rows={4}
        value={postText}
        onChange={handleChangePostText}
        className='col-span-full resize-none rounded bg-neutral-900 focus:outline-none'
      />
      {letterCount()}
      <button onClick={handleAddPost}>Post</button>
    </div>
  );
};

export default NewPost;
