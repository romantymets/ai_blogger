'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

// import useToggle from '@/hooks/useToggle'

import { alertService } from '@/services/alerts-service'

import useGetUser from '@/hooks/useGetUser'

import { classNames } from '@/utils/classNames'

// import { commentService } from '@/services/comment.service'
import { useCreateCommentMutation } from '@/gql/graphql'

import CommentAuthor from '@/components/PostPage/Comments/CommentAuthor/CommentAuthor'
import Spinner from '@/components/UIComponents/Spinner'

import { PostAuthor } from '@/models/postsModel'

interface IDefaultValues {
  comment: string
}

interface Props {
  author: PostAuthor
  postId: string
}

const CommentsForm = ({ postId }: Props) => {
  // const { open: loading, onOpen, onClose } = useToggle()
  const router = useRouter()

  const [createCommentMutation, { loading }] = useCreateCommentMutation()

  const defaultValues = {
    comment: '',
  }

  const { user } = useGetUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = ({ comment }: IDefaultValues) => {
    if (!user?.userId) {
      alertService.error('Login please')
      return
    }

    createCommentMutation({
      variables: {
        input: {
          comment,
          postId,
          authorId: user.userId,
        },
      },
    })
      .then(() => {
        alertService.success('Comment successful created')
        router.refresh()
        reset()
      })
      .catch((e) => {
        console.error(e)
        alertService.error(e.message)
      })
  }

  // const onSubmit = ({ comment }: IDefaultValues) => {
  //   if (!user?.userId) {
  //     alertService.error('Login please')
  //     return
  //   }
  //   onOpen()
  //   return commentService
  //     .createComment({
  //       comment,
  //       postId,
  //     })
  //     .then(() => {
  //       alertService.success('Comment successful created')
  //       router.refresh()
  //       reset()
  //       onClose()
  //     })
  //     .catch((e) => {
  //       console.error(e)
  //       alertService.error(e.message)
  //       onClose()
  //     })
  // }

  return (
    <form
      className="p-5 border border-azureRadiance rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      {user?.userId && (
        <CommentAuthor
          id={user.userId}
          userName={user.userName}
          image={user?.image}
        />
      )}
      <div className="mt-4">
        <textarea
          id={'comment'}
          name={'comment'}
          rows={4}
          required
          {...register('comment', {
            required: 'Please write something',
          })}
          className={classNames(
            'block w-full rounded-md border-0 py-1.5 px-2 text-trout focus:outline-none focus:border-azureRadiance focus:ring-1 focus:ring-azureRadiance',
            errors.comment
              ? 'border-1 border-red-500 ring-1 ring-red-500 focus:ring-red-500'
              : 'focus:border-sky-500 focus:ring-1 focus:ring-azureRadiance'
          )}
          aria-invalid={errors.comment ? 'true' : 'false'}
        />
        {errors.comment?.message && (
          <p role="alert" className="mt-2 ml-3 text-xs text-red-500">
            {errors.comment?.message}
          </p>
        )}
      </div>
      <div className={'h-[1px] w-full bg-silver mt-5 mb-5'} />
      <div className={'flex justify-end'}>
        <button
          className={
            'text-white px-5 py-2 bg-azureRadiance rounded-md min-w-[120px]'
          }
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner className={'h-[20px] w-[20px]'} /> : 'Comment'}
        </button>
      </div>
    </form>
  )
}

export default CommentsForm
