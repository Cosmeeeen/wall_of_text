import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfileCircle = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClickIcon = () => router.push('/profile');

  if (!session) {
    return (
      <>
        <UserCircleIcon
          className='fixed top-3 left-4 h-10 w-10 cursor-pointer rounded-full text-gray-100'
          onClick={handleClickIcon}
        />
      </>
    );
  }
  return (
    <>
      <Image
        src={session?.user?.image}
        alt={`${session?.user?.name}'s Profile Photo`}
        width='50'
        height='50'
        quality='100'
        className='fixed top-3 left-4 h-10 w-10 cursor-pointer rounded-full'
        onClick={handleClickIcon}
      />
    </>
  );
};

export default ProfileCircle;
