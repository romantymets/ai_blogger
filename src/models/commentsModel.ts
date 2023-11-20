import { PostAuthor } from '@/models/postsModel'

export interface CreateCommentCredential {
  authorId: string
  postId: string
  comment: string
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  authorId: string
  postId: string
  author: PostAuthor
}
