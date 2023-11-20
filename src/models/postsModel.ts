import { Comment } from '@/models/commentsModel'

export interface PostAuthor {
  id: string
  userName: string
  image?: string
}

export interface LikeItem {
  postId: string
  id: string
  userId: string
}

export interface Post {
  id: string
  title: string
  content: string
  subtitle?: string
  image?: string | null
  author: PostAuthor
  authorId: string
  createdAt: Date
  comments: Comment[] | []
  likes: LikeItem[] | []
  popularity?: number
}

export interface RecentPost {
  id: string
  title: string
  content: string
  subtitle?: string
  image?: string | null
  authorId: string
  createdAt: Date
}
