'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import useGetUser from '@/hooks/useGetUser'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { CREATE_POST } from '@/constants/navigationLinks'

const EditButton = ({
  postId,
  authorId,
}: {
  postId: string
  authorId: string
}) => {
  const { user } = useGetUser()
  return (
    <Fragment>
      {user?.userId === authorId && (
        <Link href={`${CREATE_POST.href}/edit/${postId}`}>
          <PencilSquareIcon className={'h-10 w-4'} />
        </Link>
      )}
    </Fragment>
  )
}

export default EditButton
