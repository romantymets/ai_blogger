import { mostPopular, newest } from '@/components/HomePage/SortsList/SortsLit'

export const getPostsOrder = (key?: string) => {
  switch (key) {
    case newest.key:
      return [{ createdAt: 'desc' }]
    case mostPopular.key:
      return [
        {
          likes: {
            _count: 'desc',
          },
        },
        {
          comments: {
            _count: 'desc',
          },
        },
      ]
    default:
      return [{ createdAt: 'desc' }]
  }
}
