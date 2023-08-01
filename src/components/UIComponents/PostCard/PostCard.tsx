import Image from 'next/image'
import Link from 'next/link'

import defImage from 'public/postHero.jpg'
import { Post } from '@/models/postsModel'
import { CREATE_POST } from '@/constants/navigationLinks'

import AuthorComponent from '@/components/UIComponents/PostCard/AuthorComponent'

const PostCard = ({
  title,
  image,
  author,
  id,
  createdAt,
  comments,
  content,
  authorId,
}: Post) => {
  return (
    <Link
      href={`${CREATE_POST.href}/${id}`}
      className="max-w-[320px] w-full h-full bg-white border border-gray-200 rounded-lg shadow cursor-pointer"
    >
      <div className={'relative min-h-[280px] h-full w-full'}>
        <Image
          className="rounded-t-lg object-cover"
          src={image || defImage}
          alt={title}
          fill
          sizes={'100%'}
        />
      </div>
      <div className={'p-5'}>
        <p className={'mb-3 text-paleSky text-xs'}>
          {new Date(createdAt).toDateString()}
        </p>
        <h5 className="mb-2 min-h-[56px] text-lg text-trout font-bold tracking-tight line-clamp-[2] overflow-hidden">
          {title}
        </h5>
        <p className="mb-5 min-h-[96px] tex-xs text-paleSky line-clamp-[4] overflow-hidden">
          {content}
        </p>
        <div className="w-full h-[1px] bg-natural200"></div>
        <AuthorComponent
          author={author}
          comments={comments?.length}
          authorId={authorId}
        />
      </div>
    </Link>
  )
}

export default PostCard
