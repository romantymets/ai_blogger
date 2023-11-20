import * as yup from 'yup'

import { PasswordRegExp } from '@/constants/regExp'

export interface LoginCredential {
  password: string
  email: string
}

export const loginValidationSchema: yup.ObjectSchema<LoginCredential> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Password is require')
      .matches(
        PasswordRegExp,
        'Minimum eight characters, at least one letter and one number'
      ),
  })
