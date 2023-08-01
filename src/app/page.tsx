import { Fragment } from 'react'
import HomePage from '@/components/HomePage'
import { getAllPosts } from '@/helpers/api/service/post-service'
import { generateSearchQuery } from '@/utils/generateSearchQuery'
import { generatePostListQuery } from '@/utils/generatePostListQuery'

export const revalidate = 5
export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }) => {
  const { page, search, sortOrder } = searchParams

  const postsListQuery = generatePostListQuery(page, sortOrder)

  let searchData

  const { posts = [], total } = await getAllPosts(postsListQuery)

  if (search) {
    const searchQuery = generateSearchQuery(search)
    const { posts: searchPosts = [] } = await getAllPosts(searchQuery)
    searchData = searchPosts
  }

  return (
    <Fragment>
      <HomePage
        posts={posts}
        total={total}
        page={page}
        searchData={searchData}
        sortOrder={sortOrder}
      />
    </Fragment>
  )
}

export default Home
