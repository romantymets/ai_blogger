import * as yup from 'yup'

export interface UpdateUserCredential {
  userName: string
  aboutUser?: string
  image?: File | null | any
}

export const updateUserValidationSchema: yup.ObjectSchema<UpdateUserCredential> =
  yup.object().shape({
    userName: yup.string().required(),
    aboutUser: yup.string().nullable(),
    image: yup.mixed().nullable().default(null).label('File'),
  })
