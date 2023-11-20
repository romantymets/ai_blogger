export interface CreateUserCredential {
  email: string
  password: string
  userName: string
  aboutUser?: string
  image?: string
}

export interface UserDto {
  email: string
  userId: string
  userName: string
}

export interface IUserValue {
  userName: string
  userId: string
  email: string
  image?: string | null
}

export interface UpdateUserCredential {
  userName?: string
  aboutUser?: string
  image?: string
}
