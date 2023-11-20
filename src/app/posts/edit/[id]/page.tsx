// import { findPostById } from '@/helpers/api/service/post-service'

import get from 'lodash/get'
import EditPostPage from '@/components/EditPostPage'
import { getClient } from '@/libs/apollo-client'
import { GET_POST_QUERY } from '@/query/post/query'

interface IPostProps {
  params: { id: string }
}

export const revalidate = 60

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

  // const post = await findPostById(id)

  const { data } = await getClient().query({
    query: GET_POST_QUERY,
    variables: {
      id,
    },
  })

  const post = get(data, 'getPost', {})

  return <EditPostPage post={post} />
}

export default Post
