import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { CreateFavoriteCredential } from '@/models/favoriteModel'

export const baseCommentsUrl = '/api/favorite'

const createFavorite = async (data: CreateFavoriteCredential) =>
  await fetchWrapper.post(`${baseCommentsUrl}`, data, {
    next: { revalidate: 2 },
  })

const deleteFavorite = async (id: string) =>
  await fetchWrapper.delete(
    `${baseCommentsUrl}/${id}`,
    {},
    {
      next: { revalidate: 2 },
    }
  )

export const favoriteService = {
  createFavorite,
  deleteFavorite,
}
