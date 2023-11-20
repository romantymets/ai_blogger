import { getClient } from '@/libs/apollo-client'
import get from 'lodash/get'

import PostPage from '@/components/PostPage/PostPage'
// import {
//   findPostById,
//   getResentPosts,
// } from '@/helpers/api/service/post-service'
// import { getCommentsByPost } from '@/helpers/api/service/comment-service'

import { GET_POST_QUERY, GET_RESENT_POSTS_QUERY } from '@/query/post/query'
import { GET_COMMENTS_BY_POST_QUERY } from '@/query/comment/query'

interface IPostProps {
  params: { id: string }
}

export const revalidate = 5
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  // const post = await findPostById(params.id)

  const { data } = await getClient().query({
    query: GET_POST_QUERY,
    variables: {
      id: params.id,
    },
  })
  const post = get(data, 'getPost', {})
  return {
    title: post?.title || 'Post',
    description: post?.subtitle || post?.title,
  }
}

const Post = async ({ params }: IPostProps) => {
  const { id = '' } = params

  const { data } = await getClient().query({
    query: GET_POST_QUERY,
    variables: {
      id,
    },
  })

  const { data: recentPostsData } = await getClient().query({
    query: GET_RESENT_POSTS_QUERY,
    variables: {
      id,
    },
  })

  const { data: commentsData } = await getClient().query({
    query: GET_COMMENTS_BY_POST_QUERY,
    variables: {
      id,
    },
  })

  const post = get(data, 'getPost', {})
  const recentPosts = get(recentPostsData, 'getResentPosts', [])
  const comments = get(commentsData, 'getCommentsByPost', [])

  // const post = await findPostById(id)

  // const recentPosts = await getResentPosts(id)

  // const comments = await getCommentsByPost(id)

  return <PostPage post={post} recentPosts={recentPosts} comments={comments} />
}

export default Post
