import React from 'react'
import { RecentPost } from '@/models/postsModel'
import PostCard from '@/components/PostPage/RecentPosts/PostCard'

interface Props {
  recentPosts: RecentPost[]
}

const RecentPosts = ({ recentPosts }: Props) => {
  return (
    <section className={'w-full py-20 bg-recentBg flex justify-center'}>
      <div className={'container max-w-[1400px] flex flex-col px-3.5'}>
        <p className={'mb-6 text-bold text-trout text-lg ml-3'}>Recent posts</p>
        <div
          className={'flex flex-wrap gap-[20px] items-center justify-center'}
        >
          {recentPosts?.map((post) => (
            <PostCard key={`${post.title}-${post.id}`} {...post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentPosts
