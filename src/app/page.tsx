import { Fragment } from 'react'
import HomePage from '@/components/HomePage'
import { getAllPosts } from '@/helpers/api/service/post-service'
import { generateSearchQuery } from '@/utils/generateSearchQuery'
import { generatePostListQuery } from '@/utils/generatePostListQuery'

export const revalidate = 60

const Home = async ({ searchParams }) => {
  const { page, search } = searchParams

  const postsListQuery = generatePostListQuery(page)

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
      />
    </Fragment>
  )
}

export default Home
