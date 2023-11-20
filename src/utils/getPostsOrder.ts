import { MOST_POPULAR_POST, NEWEST_POST } from '@/constants/pagination'

export const getPostsOrder = (key?: string) => {
  switch (key) {
    case NEWEST_POST.key:
      return [{ createdAt: 'desc' }]
    case MOST_POPULAR_POST.key:
      return [
        {
          comments: {
            _count: 'desc',
          },
        },
        {
          likes: {
            _count: 'desc',
          },
        },
      ]
    default:
      return [{ createdAt: 'desc' }]
  }
}
