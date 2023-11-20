export class ApiError extends Error {
  status
  errors
  constructor(status?: number, message?: string, errors?: any[]) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'user not authorize')
  }

  static BadRequest(message?: string, errors?: any[]) {
    return new ApiError(401, message, errors)
  }
}
