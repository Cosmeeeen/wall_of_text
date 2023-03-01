import React from 'react';
import { formatMinutesAgo } from '../utils/time';

const Post = ({ text, createdAt, user = 'unknown' }) => {
  const [minutesAgo, setMinutesAgo] = React.useState('');

  // This will most likely cause problems if no pagination is added
  React.useEffect(() => {
    setMinutesAgo(formatMinutesAgo(createdAt));
    const minutesAgoRefresh = setInterval(() => {
      console.log('refreshed');
      setMinutesAgo(formatMinutesAgo(createdAt));
    }, 30 * 1000);
    return () => clearInterval(minutesAgoRefresh);
  }, [createdAt]);

  return (
    <div className='m-3 flex flex-col break-words rounded-xl bg-neutral-800 p-4'>
      <p className='text-m'>{text}</p>
      <p className='self-end text-xs text-neutral-400'>{`${user} - ${minutesAgo}`}</p>
    </div>
  );
};

export default Post;
