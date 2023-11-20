'use client'
import { useRouter } from 'next/navigation'

import useGetUser from '@/hooks/useGetUser'

import { alertService } from '@/services/alerts-service'

import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { useDeleteCommentMutation } from '@/gql/graphql'

const RemoveButton = ({ id, authorId }: { id: string; authorId: string }) => {
  const [deleteCommentMutation, { loading }] = useDeleteCommentMutation()

  const { user } = useGetUser()

  const router = useRouter()

  const handleDelete = () => {
    deleteCommentMutation({
      variables: {
        id,
      },
    })
      .then(() => {
        alertService.success('Comment successful deleted')
        router.refresh()
      })
      .catch((error) => {
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
