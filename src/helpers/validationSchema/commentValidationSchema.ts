import * as yup from 'yup'

export interface CommentCredential {
  comment: string
  postId: string
}

export const commentValidationSchema: yup.ObjectSchema<CommentCredential> = yup
  .object()
  .shape({
    comment: yup.string().required(),
    postId: yup.string().required(),
  })
