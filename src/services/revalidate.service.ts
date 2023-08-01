import { fetchWrapper } from '@/helpers/fetch-wrapper'

export const baseRevalidateUrl = '/api/revalidate'

const revalidate = async (path: string) =>
  await fetchWrapper.get(`${baseRevalidateUrl}?path=${path}`)

export const revalidateService = {
  revalidate,
}
