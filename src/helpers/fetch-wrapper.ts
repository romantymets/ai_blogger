import { baseAuthUrl, saveUser, userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'
import { redirect } from 'next/navigation'
import { LOG_IN } from '@/constants/navigationLinks'

export const privateApi = ['api/user', 'api/post']

interface RequestOptions {
  method: string
  headers: { Authorization: string } | HeadersInit
  body?: string
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
  return async (url: string, body: any) => {
    const requestOptions: RequestOptions = {
      method,
      headers: authHeader(url),
    }
    if (body) {
      if (body instanceof FormData) {
        requestOptions.body = body as any
      } else {
        requestOptions.headers['Content-Type'] = 'application/json'
        requestOptions.body = JSON.stringify(body)
      }
    }
    let response = await fetch(url, requestOptions)
    if (!response.ok) {
      const errorData = await response.json()
      if ([401, 403].includes(response.status) && userService.userValue) {
        // auto refresh if 401 Unauthorized or 403 Forbidden response returned from api
        try {
          const refreshRes = await fetch(`${baseAuthUrl}/refresh`, {
            method: 'POST',
            headers: authHeader(`${baseAuthUrl}/refresh`),
          })
          if (!refreshRes.ok) {
            const refreshErrorData = await refreshRes.json()
            const error =
              (response && refreshErrorData?.message) || response.statusText
            return Promise.reject(new Error(error))
          }
          if (refreshRes.ok) {
            const userData = await refreshRes.json()
            saveUser(userData)
            response = await fetch(url, requestOptions)
          }
        } catch (error) {
          userService.logout()
          alertService.error('Unauthorized')
          redirect(LOG_IN.href)
        }
      } else {
        const error = (response && errorData?.message) || response.statusText
        return Promise.reject(new Error(error))
      }
    }
    return await response.json()
  }
}

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue
  const isLoggedIn = user?.accessToken
  const isApiUrl = privateApi.find((el) => url.startsWith(el))
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.accessToken}` }
  }
  if (isLoggedIn && url.startsWith('api/auth/refresh')) {
    return { Authorization: `Bearer ${user.refreshToken}` }
  }
  return {}
}
