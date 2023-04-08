import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const CreatePostWizard = () => {

  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex gap-3 w-full ">
      <Image
        className='rounded-full'
        alt="userImg"
        src={user.profileImageUrl}
        width={36}
        height={36}
      />
      <input className='bg-transparent grow outline-none' placeholder="Type some emojis!" />
    </div>
  )
}

export default CreatePostWizard
