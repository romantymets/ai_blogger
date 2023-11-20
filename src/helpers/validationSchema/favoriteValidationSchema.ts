import * as yup from 'yup'
import { CreateFavoriteCredential } from '@/models/favoriteModel'

export const favoriteValidationSchema: yup.ObjectSchema<CreateFavoriteCredential> =
  yup.object().shape({
    userId: yup.string().required(),
    postId: yup.string().required(),
  })
