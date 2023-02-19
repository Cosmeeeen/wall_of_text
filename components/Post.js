import React from 'react';

const Post = ({ text, date, user }) => {
  return (
    <div className='m-3 flex flex-col break-words rounded-xl bg-neutral-800 p-4'>
      <p className='text-m'>{text}</p>
      <p className='self-end text-xs text-neutral-400'>{`${user} - ${date}`}</p>
    </div>
  );
};

export default Post;
