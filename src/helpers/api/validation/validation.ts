import * as yup from 'yup'

export async function validation<T = Record<string, any>>(
  scheme: yup.ObjectSchema<T>,
  data: Record<string, any> | null
) {
  try {
    const result = await scheme.validate(data, { abortEarly: false })
    return { isValid: true, errors: null, data: result }
  } catch (error) {
    const { errors } = error
    return { isValid: false, errors, data: null }
  }
}
