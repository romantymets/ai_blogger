import Image from 'next/image'
import defImage from 'public/postHero.jpg'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Post } from '@/models/postsModel'

const PostCard = ({
  title,
  image,
  author,
  createdAt,
  comments,
  content,
}: Post) => {
  return (
    <div className="max-w-[320px] bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
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
        <h5 className="mb-2 text-lg text-trout font-bold tracking-tight line-clamp-[2] overflow-hidden">
          {title}
        </h5>
        <p className="mb-5 tex-xs text-paleSky line-clamp-[4] overflow-hidden">
          {content}
        </p>
        <div className="w-full h-[1px] bg-natural200"></div>
        <div className="mt-5">
          <div className="flex items-center">
            {!author?.image ? (
              <UserCircleIcon
                className="h-[50px] w-[50px] text-stone-600"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={author?.image}
                width={50}
                height={50}
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                }}
                alt={'author'}
              />
            )}
            <div className={'flex flex-col ml-4'}>
              <p>By {author.userName}</p>
              <div className="text-paleSky text-xs flex items-start">
                <span className="mr-3">{comments?.length || 0}</span>
                <ChatBubbleLeftEllipsisIcon className="h-[14px] w-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
