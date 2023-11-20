import * as yup from 'yup'

import { PasswordRegExp } from '@/constants/regExp'

export interface RegistrationCredential {
  userName: string
  email: string
  password: string
  aboutUser?: string
  image?: File | null | any
}

export const registrationValidationSchema: yup.ObjectSchema<RegistrationCredential> =
  yup.object().shape({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Password is require')
      .matches(
        PasswordRegExp,
        'Minimum eight characters, at least one letter and one number'
      ),
    aboutUser: yup.string().nullable(),
    image: yup.mixed().nullable().default(null).label('File'),
  })
