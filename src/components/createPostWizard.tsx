import { api } from '@/utils/api';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useContext, useState } from 'react'

const CreatePostWizard = () => {

  const [input, setInput] = useState("")
  const { user } = useUser();

  const ctx= api.useContext()
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: ()=>{
      setInput(''),
      ctx.post.getAll.invalidate()
    }
  })

  if (!user) return null;

  return (
    <div className="flex gap-3 w-full ">
      <Image
        className='rounded-full'
        alt="userImg"
        src={user.profileImageUrl}
        width={56}
        height={56}
      />
      <input
        className='bg-transparent grow outline-none'
        placeholder="Type some emojis!"
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
      />
      <button
      className='p-5 bg-purple-600 rounded-full'
      onClick={()=>mutate({content: input})}
      > Post</button>
    </div>
  )
}

export default CreatePostWizard
