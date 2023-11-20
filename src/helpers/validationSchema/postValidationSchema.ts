import * as yup from 'yup'

export interface PostCredential {
  title: string
  content: string
  subtitle?: string | null
  image?: File | null | any
}

export const postValidationSchema: yup.ObjectSchema<PostCredential> = yup
  .object()
  .shape({
    title: yup.string().required(),
    content: yup.string().required(),
    subtitle: yup.string().nullable(),
    image: yup.mixed().nullable().default(null).label('File'),
  })
