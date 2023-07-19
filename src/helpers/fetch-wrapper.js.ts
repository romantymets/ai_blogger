import { NextResponse } from 'next/server'
import { userService } from '@/services/user.service'

interface RequestOptions {
  method: string
  headers: { Authorization: string } | HeadersInit
  body?: string
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}

function request(method: string) {
  return (url: string, body: any) => {
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
    return fetch(url, requestOptions).then(handleResponse)
  }
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue
  const isLoggedIn = user?.accessToken
  const isApiUrl = url.startsWith('api/user')
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.accessToken}` }
  }
  return {}
}

async function handleResponse(response: NextResponse) {
  const isJson = response.headers
    ?.get('content-type')
    ?.includes('application/json')
  const data = isJson ? await response.json() : null
  // check for error response
  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      userService.logout()
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  return data
}
