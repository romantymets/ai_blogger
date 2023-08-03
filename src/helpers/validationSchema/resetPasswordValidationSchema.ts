import * as yup from 'yup'

import { PasswordRegExp } from '@/constants/regExp'

export interface ResetPasswordCredential {
  email: string
  password: string
  confirmPassword: string
}

export const resetPasswordValidationSchema: yup.ObjectSchema<ResetPasswordCredential> =
  yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Password is require')
      .matches(
        PasswordRegExp,
        'Minimum eight characters, at least one letter and one number'
      ),
    confirmPassword: yup
      .string()
      .required('Password is require')
      .matches(
        PasswordRegExp,
        'Minimum eight characters, at least one letter and one number'
      )
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
