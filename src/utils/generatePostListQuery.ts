import { POST_LIMIT } from '@/constants/pagination'
import { getPostsOrder } from '@/utils/getPostsOrder'

export const generatePostListQuery = (page?: number, sortOrder?: string) => {
  const orderBy = getPostsOrder(sortOrder)
  return {
    skip: page > 1 ? (page - 1) * POST_LIMIT : 0,
    take: POST_LIMIT,
    include: {
      author: true,
      comments: true,
      likes: true,
    },
    orderBy,
  }
}
