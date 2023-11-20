import { Metadata } from 'next'
import CreatePostPage from '@/components/CreatePostPage'
import { CREATE_POST } from '@/constants/navigationLinks'

export const metadata: Metadata = {
  title: CREATE_POST.name,
  description: CREATE_POST.name,
}

const Posts = () => {
  return <CreatePostPage />
}

export default Posts
