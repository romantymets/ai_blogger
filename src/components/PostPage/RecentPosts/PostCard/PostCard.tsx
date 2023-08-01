import Image from 'next/image'
import Link from 'next/link'

import defImage from 'public/postHero.jpg'
import { RecentPost } from '@/models/postsModel'
import { CREATE_POST } from '@/constants/navigationLinks'

const PostCard = ({ title, image, id, createdAt, content }: RecentPost) => {
  return (
    <Link
      href={`${CREATE_POST.href}/${id}`}
      className="max-w-[320px] w-full bg-transparent rounded-lg cursor-pointer"
    >
      <div className={'relative min-h-[280px] w-full'}>
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
        <p className="mb-5 tex-xs min-h-[96px] text-paleSky line-clamp-[4] overflow-hidden">
          {content}
        </p>
      </div>
    </Link>
  )
}

export default PostCard
