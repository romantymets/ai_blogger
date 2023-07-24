import { fetchWrapper } from '@/helpers/fetch-wrapper'
import { BehaviorSubject } from 'rxjs'
import { IUserValue } from '@/models/userServiceModel'

export const baseAuthUrl = '/api/auth'
export const baseUsersUrl = '/api/users'

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

const getUserById = async (id: string) => {
  const promise = fetchWrapper.get(`${baseUsersUrl}/${id}`)
  return await promise
}

const updateUser = async (id: string, userData: FormData) => {
  const user = await fetchWrapper.put(`${baseUsersUrl}/${id}`, userData)
  saveUser(user)
  return user
}

const deleteUser = async (id: string) => {
  const user = await fetchWrapper.delete(`${baseUsersUrl}/${id}`)
  logout()
  return user
}

export const userService = {
  register,
  logout,
  login,
  getUserById,
  deleteUser,
  updateUser,
  resetPassword,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
}
