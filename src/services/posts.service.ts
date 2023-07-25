import { fetchWrapper } from '@/helpers/fetch-wrapper'

export const basePostsUrl = '/api/posts'

const create = async (post: FormData) =>
  await fetchWrapper.post(`${basePostsUrl}`, post)

const getPostById = async (id: string) =>
  await fetchWrapper.get(`${basePostsUrl}/${id}`)

const updatePost = async (id: string, userData: FormData) =>
  await fetchWrapper.put(`${basePostsUrl}/${id}`, userData)

const deletePost = async (id: string) =>
  await fetchWrapper.delete(`${basePostsUrl}/${id}`)

export const postsService = {
  create,
  getPostById,
  updatePost,
  deletePost,
}
