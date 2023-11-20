import Image from 'next/image'
import Link from 'next/link'

import { isPluralWord } from '@/utils/isPluralWord'
import { AUTHOR } from '@/constants/navigationLinks'
import { Author } from '@/models/userModel'

import { UserCircleIcon } from '@heroicons/react/24/solid'

interface AboutAuthorProps extends Author {
  postsQuantity: number
}

const AboutAuthor = ({
  aboutUser,
  userId,
  userName,
  image,
  postsQuantity = 0,
}: AboutAuthorProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded p-5 shadow w-full max-w-md h-fit min-h-[300px]">
      <Link href={`${AUTHOR.href}/${userId}`} className="flex items-center">
        {!image ? (
          <UserCircleIcon
            className="h-[50px] w-[50px] text-stone-600"
            aria-hidden="true"
          />
        ) : (
          <Image
            src={image}
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
      </Link>
      <h5 className="mt-2 text-lg text-trout font-bold tracking-tight line-clamp-[2] overflow-hidden">
        {userName}
      </h5>
      {aboutUser && <p className="mt-2 tex-xs text-paleSky">{aboutUser}</p>}
      <p className="mt-2 tex-xs text-paleSky">{`${postsQuantity} post${isPluralWord(
        postsQuantity
      )}`}</p>
    </div>
  )
}

export default AboutAuthor
