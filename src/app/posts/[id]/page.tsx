import {
  findPostById,
  getResentPosts,
} from '@/helpers/api/service/post-service'

import PostPage from '@/components/PostPage/PostPage'
import { getCommentsByPost } from '@/helpers/api/service/comment-service'

interface IPostProps {
  params: { id: string }
}

export const revalidate = 5

export async function generateMetadata({ params }) {
  const post = await findPostById(params.id)
  return {
    title: post?.title || 'Post',
    description: post?.subtitle || post?.title,
  }
}

const Post = async ({ params }: IPostProps) => {
  const { id = '' } = params

  const post = await findPostById(id)

  const recentPosts = await getResentPosts(id)

  const comments = await getCommentsByPost(id)

  return <PostPage post={post} recentPosts={recentPosts} comments={comments} />
}

export default Post
