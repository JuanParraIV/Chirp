import { api } from '@/utils/api';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from './loading';

const CreatePostWizard = () => {

  const [input, setInput] = useState<string>("")
  const { user } = useUser();

  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput(''),
        void ctx.post.getAll.invalidate()
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to post! Please try again later.')
      }
    }
  })

  if (!user) return null;

  const handlePost = () => {
    try {
      if (input !== "") {
        mutate({content: input})
      }
      setInput("");
    } catch (err: unknown) {
    }
  };

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
        onKeyDown={(e)=>{
          if (e.key === 'Enter') {
            e.preventDefault()
            if (input !== "") {
              mutate({content: input})
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button
          className='p-5 bg-purple-600 rounded-full'
          onClick={handlePost}
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className='flex justify-center items-center'>
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  )
}

export default CreatePostWizard
