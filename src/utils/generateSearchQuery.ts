import { SEARCH_LIMIT } from '@/constants/pagination'

export const generateSearchQuery = (search: string) => {
  return {
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            userName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    take: SEARCH_LIMIT,
    include: {
      author: true,
      comments: true,
    },
    orderBy: [{ createdAt: 'desc' }],
  }
}
