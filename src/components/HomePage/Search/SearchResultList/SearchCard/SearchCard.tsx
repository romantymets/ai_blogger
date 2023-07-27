import Image from 'next/image'
import defImage from 'public/postHero.jpg'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Post } from '@/models/postsModel'

const SearchCard = ({
  image,
  author,
  comments,
  id,
  content,
  title,
  createdAt,
}: Post) => {
  return (
    <div className="max-w-full bg-white border-b-1 rounded-lg cursor-pointer flex">
      <div className={'relative min-h-[100px] max-h-[120px] min-w-[200px]'}>
        <Image
          className="rounded object-cover"
          src={image || defImage}
          alt={title}
          fill
          sizes={'100%'}
        />
      </div>
      <div className={'px-3'}>
        <div className={'flex justify-between items-center'}>
          <div className="flex items-center">
            {!author?.image ? (
              <UserCircleIcon
                className="h-[32px] w-[32px] text-stone-600"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={author?.image}
                width={32}
                height={32}
                style={{
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                }}
                alt={'author'}
              />
            )}
            <div className={'flex flex-col ml-3'}>
              <p>By {author.userName}</p>
              <div className="text-paleSky text-xs flex items-start">
                <span className="mr-3">{comments?.length || 0}</span>
                <ChatBubbleLeftEllipsisIcon className="h-[14px] w-[18px]" />
              </div>
            </div>
          </div>
          <p className={'mb-1 text-paleSky text-xs'}>
            {new Date(createdAt).toDateString()}
          </p>
        </div>
        <h5 className="mb-1 text-md text-trout font-bold tracking-tight line-clamp-[2] overflow-hidden">
          {title}
        </h5>
        <p className="mb-1 tex-xs text-paleSky line-clamp-[2] overflow-hidden">
          {content}
        </p>
        <div className="w-full h-[1px] bg-natural200"></div>
      </div>
    </div>
  )
}

export default SearchCard
