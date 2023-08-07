'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { AUTHOR } from '@/constants/navigationLinks'

import { LikeItem, PostAuthor } from '@/models/postsModel'
import LikeButton from '@/components/UIComponents/PostCard/AuthorComponent/LikeButton'

interface Props {
  author: PostAuthor
  comments?: number
  authorId: string
  postId: string
  likes: LikeItem[] | []
}

const AuthorComponent = ({
  author,
  comments,
  authorId,
  postId,
  likes,
}: Props) => {
  const router = useRouter()

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(`${AUTHOR.href}/${authorId}`)
  }

  return (
    <div className="mt-5">
      <div
        onClick={handleNavigate}
        className="flex items-center cursor-pointer"
      >
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
          <div className={'flex'}>
            <div className="text-paleSky text-xs flex items-center">
              <ChatBubbleLeftEllipsisIcon className="h-[20px] w-[24px]" />
              <span className="ml-3">{comments || 0}</span>
            </div>
            <LikeButton postId={postId} likes={likes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorComponent
