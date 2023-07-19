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
