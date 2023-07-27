export interface PostAuthor {
  id: string
  userName: string
  image?: string
}

export interface Post {
  id: string
  title: string
  content: string
  subtitle?: string
  image?: string | null
  author: PostAuthor
  createdAt: Date
  comments: any[]
}
