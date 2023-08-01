import React, { Fragment } from 'react'

import Hero from '@/components/Hero'
import HeroContent from '@/components/CreatePostPage/HeroContent'

import defImage from 'public/postHero.jpg'
import { Post, RecentPost } from '@/models/postsModel'
import PostBody from '@/components/PostPage/PostBody/PostBody'
import RecentPosts from '@/components/PostPage/RecentPosts'
import Comments from '@/components/PostPage/Comments'
import { Comment } from '@/models/commentsModel'

interface IPostProps {
  post: Post
  recentPosts: RecentPost[]
  comments?: Comment[]
}

const PostPage = ({ post, recentPosts, comments }: IPostProps) => {
  return (
    <Fragment>
      <Hero image={post?.image || defImage}>
        <HeroContent
          title={post.title}
          subtitle={post?.subtitle}
          userName={post?.author?.userName}
        />
      </Hero>
      <div className="flex w-full justify-center py-20 bg-athensGray">
        <PostBody {...post} />
      </div>
      {recentPosts && <RecentPosts recentPosts={recentPosts} />}
      <Comments postId={post.id} author={post.author} comments={comments} />
    </Fragment>
  )
}

export default PostPage
