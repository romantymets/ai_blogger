import { NextResponse } from 'next/server'

interface ErrorResponse extends Error {
  message: string
  name: string
  errors?: any
  status?: number
}

export const generateErrorResponse = (error: ErrorResponse): NextResponse => {
  console.error('error ==>', error)
  return new NextResponse(
    JSON.stringify({
      message: error?.message || error?.name,
      name: error?.name,
      errors: error?.errors,
    }),
    {
      status: error?.status || 500,
      message: error?.message || error?.name,
      headers: { 'content-type': 'application/json' },
    } as any
  )
}
