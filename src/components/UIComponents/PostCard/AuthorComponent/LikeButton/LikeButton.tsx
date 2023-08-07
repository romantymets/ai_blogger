'use client'
import React from 'react'

import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { classNames } from '@/utils/classNames'
import { favoriteService } from '@/services/favorite.service'
import { alertService } from '@/services/alerts-service'
import useGetUser from '@/hooks/useGetUser'
import { useRouter } from 'next/navigation'
import { LikeItem } from '@/models/postsModel'
import useToggle from '@/hooks/useToggle'

interface Props {
  postId: string
  likes: LikeItem[] | []
}

const getLikedPost = (likes: LikeItem[], postId: string, userId: string) => {
  return likes?.find((el) => {
    return el.postId === postId && el.userId === userId
  })
}

const LikeButton = ({ postId, likes }: Props) => {
  const { user } = useGetUser()
  const router = useRouter()
  const { open: loading, onOpen, onClose } = useToggle()

  const likedPost = getLikedPost(likes, postId, user?.userId)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user?.userId || !postId) {
      alertService.error('Please login')
      return
    }
    onOpen()
    likedPost?.id
      ? favoriteService
          .deleteFavorite(likedPost.id)
          .then(() => {
            onClose()
            router.refresh()
          })
          .catch((e) => {
            console.error(e)
            onClose()
          })
      : favoriteService
          .createFavorite({
            userId: user.userId,
            postId,
          })
          .then(() => {
            onClose()
            router.refresh()
          })
          .catch((e) => {
            onClose()
            console.error(e)
          })
  }

  const Icon = likedPost ? HeartIconSolid : HeartIcon
  return (
    <div
      className={classNames(
        'flex items-center ml-4',
        !likedPost ? 'text-paleSky' : 'text-rose-500'
      )}
    >
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={'like'}
        title={'like'}
      >
        <Icon className="h-[20px] w-[20px] hover:text-rose-500" />
      </button>
      <span className="ml-3">{likes?.length || 0}</span>
    </div>
  )
}

export default LikeButton
