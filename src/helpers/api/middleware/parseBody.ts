import { NextRequest } from 'next/server'
import * as yup from 'yup'
import { validation } from '@/helpers/api/validation/validation'

interface Result {
  isValid: boolean
  errors: string[] | null
  data: any
}

export const parseBody = async <T = Record<string, any>>(
  request: NextRequest,
  validationSchema?: yup.ObjectSchema<T>
): Promise<Result> => {
  try {
    const conceptType = request.headers.get('Content-Type') || ''

    if (conceptType?.includes('multipart/form-data;' || undefined)) {
      const formDataBody = await request.formData()
      const formDataObj = {}
      formDataBody.forEach((value, key) => (formDataObj[key] = value))
      return validationSchema
        ? validation(validationSchema, formDataObj)
        : { isValid: true, errors: null, data: formDataBody }
    }

    const body = await request.json()

    if (!body) {
      return { isValid: false, errors: ['Body not found'], data: null }
    }

    return validationSchema
      ? validation(validationSchema, body)
      : { isValid: true, errors: null, data: body }
  } catch (e) {
    return { errors: [e?.message || e?.name], data: null, isValid: false }
  }
}
