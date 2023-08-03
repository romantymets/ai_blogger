import * as yup from 'yup'

export interface RefreshCredential {
  userId: string
  refreshToken: string
}

export const refreshValidationSchema: yup.ObjectSchema<RefreshCredential> = yup
  .object()
  .shape({
    userId: yup.string().required(),
    refreshToken: yup.string().required(),
  })
