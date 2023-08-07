import { userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'

export const privateApi = [
  '/api/users',
  '/api/posts',
  '/api/comments',
  '/api/favorite',
]

interface RequestOptions {
  method: string
  headers: { Authorization: string } | HeadersInit
  body?: string | FormData
}

export const POST = 'POST'
export const GET = 'GET'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

export const fetchWrapper = {
  get: request(GET),
  post: request(POST),
  put: request(PUT),
  delete: request(DELETE),
}

function request(method: string) {
  return async (
    url: string,
    body?: Record<string, any>,
    fetchOptions?: any
  ) => {
    const requestOptions: RequestOptions = {
      method,
      headers: {},
      credentials: 'include',
      ...fetchOptions,
    }
    if (body) {
      if (body instanceof FormData) {
        requestOptions.body = body as FormData
      } else {
        requestOptions.headers['Content-Type'] = 'application/json'
        requestOptions.body = JSON.stringify(body)
      }
    }
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      const isPrivateApi = privateApi.find((el) => url.startsWith(el))
      const errorData = await response.json()
      if (
        [401, 403].includes(response.status) &&
        userService.userValue &&
        isPrivateApi
      ) {
        // auto refresh if 401 Unauthorized or 403 Forbidden response returned from api
        await userService.logout()
        alertService.error('Unauthorized')
        const error = (response && errorData?.message) || response.statusText
        return Promise.reject(new Error(error))
      } else {
        const error = (response && errorData?.message) || response.statusText
        return Promise.reject(new Error(error))
      }
    }
    return await response.json()
  }
}
