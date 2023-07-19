import { fetchWrapper } from '@/helpers/fetch-wrapper.js'

interface IUserValue {
  userName?: string
  accessToken?: string
  refreshToken?: string
}

const baseAuthUrl = '/api/auth'

async function register(user: FormData) {
  return await fetchWrapper.post(`${baseAuthUrl}/registration`, user)
}

const logout = () => {
  console.log('logout')
}

const userValue: IUserValue = {}

export const userService = {
  register,
  logout,
  userValue,
}
