import { POST_LIMIT } from '@/constants/pagination'

export const generateAuthorPostListQuery = (
  authorId: string,
  page?: number
) => {
  return {
    where: {
      authorId,
    },
    skip: page > 1 ? (page - 1) * POST_LIMIT : 0,
    take: POST_LIMIT,
    include: {
      author: true,
      comments: true,
    },
    orderBy: [{ createdAt: 'desc' }],
  }
}
