import PostCard from '@/components/UIComponents/PostCard'
import { Post } from '@/models/postsModel'

const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <section
      id={'post-list'}
      className={
        'flex flex-wrap gap-[20px] items-center justify-center md:justify-start'
      }
    >
      {posts?.map((post) => (
        <PostCard key={`${post.title}-${post.id}`} {...post} />
      ))}
    </section>
  )
}

export default PostsList
