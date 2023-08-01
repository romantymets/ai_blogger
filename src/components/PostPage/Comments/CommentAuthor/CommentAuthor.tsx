import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { PostAuthor } from '@/models/postsModel'
import { AUTHOR } from '@/constants/navigationLinks'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const CommentAuthor = ({ image, id, userName }: PostAuthor) => {
  return (
    <Link href={`${AUTHOR.href}/${id}`} className="flex items-center">
      {!image ? (
        <UserCircleIcon
          className="h-[40px] w-[40px] text-stone-600"
          aria-hidden="true"
        />
      ) : (
        <Image
          src={image}
          width={40}
          height={40}
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
          }}
          alt={'author'}
        />
      )}
      <div className={'flex flex-col ml-4 font-semibold'}>
        <p>{userName}</p>
      </div>
    </Link>
  )
}

export default CommentAuthor
