import React from 'react';

const MAX_POST_LENGTH = 255;

const NewPost = ({ canPost, addPostCb }) => {
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
    if (postText.trim().length === 0) return;
    addPostCb({ user: 'testUser', text: postText.trim() });
    setPostText('');
  }, [addPostCb, postText]);

  if (canPost)
    return (
      <div className='m-3 grid grid-cols-2 gap-2 rounded-xl bg-neutral-800 p-4'>
        <textarea
          placeholder='Write your new post here...'
          maxlength={MAX_POST_LENGTH}
          rows={4}
          value={postText}
          onChange={handleChangePostText}
          className='col-span-full resize-none rounded bg-neutral-900 focus:outline-none'
        />
        {letterCount()}
        <button
          onClick={handleAddPost}
          className='transition-duration-200 rounded bg-neutral-900 px-4 py-0.5 transition-shadow hover:shadow-md hover:shadow-gray-100'
        >
          Post
        </button>
        <textarea
          placeholder='Write your new post here...'
          maxlength={MAX_POST_LENGTH}
          rows={4}
          value={postText}
          onChange={handleChangePostText}
          className='col-span-full resize-none rounded bg-neutral-900 focus:outline-none'
        />
        {letterCount()}
        <button
          onClick={handleAddPost}
          className='transition-duration-200 rounded bg-neutral-900 px-4 py-0.5 transition-shadow hover:shadow-md hover:shadow-gray-100'
        >
          Post
        </button>
      </div>
    );

  return (
    <div className='m-3 flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-800 p-4 text-center'>
      <p>You already posted today!</p>
      <p>Come back tomorrow in order to post again</p>
    </div>
  );
};

export default NewPost;
