import { Fragment } from 'react'
import HomePage from '@/components/HomePage'
// import { getAllPosts } from '@/helpers/api/service/post-service'
// import { generateSearchQuery } from '@/utils/generateSearchQuery'
// import { generatePostListQuery } from '@/utils/generatePostListQuery'
import get from 'lodash/get'
import { getClient } from '@/libs/apollo-client'
import { GET_POSTS_QUERY, GET_POSTS_SEARCH_QUERY } from '@/query/post/query'

export const revalidate = 5
export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }) => {
  const { page, search, sortOrder } = searchParams

  const { data } = await getClient().query({
    query: GET_POSTS_QUERY,
    variables: {
      page,
      sortOrder,
    },
  })

  const posts = get(data, 'getPosts.posts', [])
  const total = get(data, 'getPosts.total', 0)

  // const postsListQuery = generatePostListQuery(page, sortOrder)

  let searchData

  // const { posts = [], total } = await getAllPosts(postsListQuery)

  if (search) {
    // const searchQuery = generateSearchQuery(search)
    // const { posts: searchPosts = [] } = await getAllPosts(searchQuery)
    // searchData = searchPosts
    const { data: searchResult } = await getClient().query({
      query: GET_POSTS_SEARCH_QUERY,
      variables: {
        search,
      },
    })
    searchData = get(searchResult, 'getSearchPosts.posts', [])
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
