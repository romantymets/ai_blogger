import Link from 'next/link'
import Image from 'next/image'

import defImage from 'public/postHero.jpg'
import { Post } from '@/models/postsModel'
import { CREATE_POST } from '@/constants/navigationLinks'

import AuthorComponent from '@/components/HomePage/Search/SearchResultList/SearchCard/AuthorComponent'

const SearchCard = ({
  image,
  author,
  comments,
  id,
  authorId,
  content,
  title,
  createdAt,
}: Post) => {
  return (
    <Link
      href={`${CREATE_POST.href}/${id}`}
      className="max-w-full w-full bg-white border-b-1 rounded-lg cursor-pointer flex"
    >
      <div className={'relative min-h-[100px] max-h-[140px] min-w-[200px]'}>
        <Image
          className="rounded object-cover"
          src={image || defImage}
          alt={title}
          fill
          sizes={'100%'}
        />
      </div>
      <div className={'px-3 w-full'}>
        <div className={'flex justify-between items-center'}>
          <AuthorComponent
            author={author}
            comments={comments.length}
            authorId={authorId}
          />
          <p className={'mb-1 text-paleSky text-xs'}>
            {new Date(createdAt).toDateString()}
          </p>
        </div>
        <h5 className="mb-1 min-h[48px] text-md text-trout font-bold tracking-tight line-clamp-[2] overflow-hidden">
          {title}
        </h5>
        <p className="mb-1 min-h[48px] tex-xs text-paleSky line-clamp-[2] overflow-hidden">
          {content}
        </p>
        <div className="w-full h-[1px] bg-natural200"></div>
      </div>
    </Link>
  )
}

export default SearchCard
