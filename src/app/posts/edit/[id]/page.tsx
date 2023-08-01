import { findPostById } from '@/helpers/api/service/post-service'

import EditPostPage from '@/components/EditPostPage'

interface IPostProps {
  params: { id: string }
}

export const revalidate = 60

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

  return <EditPostPage post={post} />
}

export default Post
