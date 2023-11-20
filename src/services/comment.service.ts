import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { CommentCredential } from '@/helpers/validationSchema/commentValidationSchema'

export const baseCommentsUrl = '/api/comments'

const createComment = async (data: CommentCredential) =>
  await fetchWrapper.post(`${baseCommentsUrl}`, data, {
    next: { revalidate: 2 },
  })

const deleteComment = async (id: string) =>
  await fetchWrapper.delete(
    `${baseCommentsUrl}/${id}`,
    {},
    {
      next: { revalidate: 2 },
    }
  )

export const commentService = {
  createComment,
  deleteComment,
}
