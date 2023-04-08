import { api } from '@/utils/api';
import React from 'react'
import PostView from './postView';
import { LoadingPage } from './loading';

const Feed = () => {


  const { data, isLoading: postLoading, error } = api.post.getAll.useQuery();
  if (error) return <h1>Something goes wrong</h1>

  if (postLoading) return <LoadingPage />


  return (
    <div className="flex flex-col">
      {data &&
        data?.map((fullPost) => (
          <PostView {...fullPost} key={`${fullPost.post.content}_${fullPost.post.id}`} />
        ))}
    </div>
  )
}

export default Feed
