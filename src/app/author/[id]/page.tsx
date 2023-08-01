import { getAllPosts } from '@/helpers/api/service/post-service'
import { generateAuthorPostListQuery } from '@/utils/generateAuthorPostListQuery'
import { getUserById } from '@/helpers/api/service/user-service'

import AuthorPage from '@/components/AuthorPage'

interface IAuthorProps {
  params: { id: string }
  searchParams: { page?: number }
}

export const revalidate = 60

const Author = async ({ params, searchParams }: IAuthorProps) => {
  const { page } = searchParams
  const { id } = params

  const postsListQuery = generateAuthorPostListQuery(id, page)

  const { posts = [], total } = await getAllPosts(postsListQuery, {
    where: {
      authorId: id,
    },
  })
  const user = await getUserById(id)

  return (
    <div className="mt-16 w-full">
      <AuthorPage posts={posts} total={total} author={user} page={page} />
    </div>
  )
}

export default Author
