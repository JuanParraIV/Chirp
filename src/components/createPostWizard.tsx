import { api } from '@/utils/api';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react'
import { z } from 'zod';

const CreatePostWizard = () => {
  const contentSchema = z.string().emoji().min(1).max(280);

  const [input, setInput] = useState<string>("")
  const [error, setError] = useState<string>("");
  console.log(error)
  const { user } = useUser();

  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput(''),
      void ctx.post.getAll.invalidate()
    }
  })

  if (!user) return null;

  const handlePost = () => {
    try {
      contentSchema.parse(input); // validate the input with zod
      mutate({ content: input });
      setInput("");
    } catch (err: unknown) {
  if (err instanceof Error) setError(err.message);
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
        disabled={isPosting}
      />
      <button
        className='p-5 bg-purple-600 rounded-full'
        onClick={handlePost}
        disabled={isPosting}
      >
        Post
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default CreatePostWizard
