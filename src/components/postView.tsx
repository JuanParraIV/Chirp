import React from 'react'
import dayjs from 'dayjs'
import type { RouterOutputs } from "@/utils/api";

import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image';

dayjs.extend(relativeTime)



type PostWithUser = RouterOutputs['post']['getAll'][number]
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex p-4 border-b border-slate-400 gap-3">
      <Image
        className='rounded-full'
        alt="userImg"
        src={author.profileImageUrl}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex text-slate-300 gap-1">
            <span><span>@</span>{author?.username}</span>
          <span className="font-thin">{` · ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span className='text-xl'>{post.content}</span>
      </div>

    </div>
  )
}

export default PostView