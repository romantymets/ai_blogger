import PostCard from '@/components/UIComponents/PostCard'
import { Post } from '@/models/postsModel'

const PostsList = ({ posts }: { posts?: Post[] }) => {
  return (
    <section
      className={
        'flex flex-wrap w-full gap-[20px] items-center justify-center md:justify-start'
      }
    >
      {posts?.map((post) => (
        <PostCard key={`${post.title}-${post.id}`} {...post} />
      ))}
    </section>
  )
}

export default PostsList
