'use client'
import { useRouter } from 'next/navigation'

import useToggle from '@/hooks/useToggle'
import useGetUser from '@/hooks/useGetUser'

import { commentService } from '@/services/comment.service'
import { alertService } from '@/services/alerts-service'

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'

const RemoveButton = ({ id, authorId }: { id: string; authorId: string }) => {
  const { open: loading, onOpen, onClose } = useToggle()

  const { user } = useGetUser()

  const router = useRouter()

  const handleDelete = () => {
    onOpen()
    commentService
      .deleteComment(id)
      .then(() => {
        onClose()
        alertService.success('Comment successful deleted')
        router.refresh()
      })
      .catch((error) => {
        onClose()
        console.error(error)
      })
  }
  return (
    <Fragment>
      {authorId === user?.userId && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className={'text-red-600 disabled:opacity-75 cursor-pointer'}
        >
          <ArchiveBoxXMarkIcon className={'h-8 w-5'} />
        </button>
      )}
    </Fragment>
  )
}

export default RemoveButton
