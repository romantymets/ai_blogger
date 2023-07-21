import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { BehaviorSubject } from 'rxjs'
import { IUserValue } from '@/models/userServiceModel'
export const baseAuthUrl = '/api/auth'

export const saveUser = (user: IUserValue) => {
  userSubject.next(user)
  localStorage.setItem('user', JSON.stringify(user))
}

const userSubject = new BehaviorSubject(
  typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))
)

const register = async (user: FormData) => {
  return await fetchWrapper.post(`${baseAuthUrl}/registration`, user)
}

const login = async (email: string, password: string) => {
  const userRes = await fetchWrapper.post(`${baseAuthUrl}/login`, {
    email,
    password,
  })
  saveUser(userRes)
}

const resetPassword = async (email: string, newPassword: string) => {
  return await fetchWrapper.post(`${baseAuthUrl}/reset-password`, {
    email,
    newPassword,
  })
}

const logout = () => {
  localStorage.removeItem('user')
  userSubject.next(null)
}

export const userService = {
  register,
  logout,
  login,
  resetPassword,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
}
