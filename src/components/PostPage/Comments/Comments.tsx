import React from 'react'

import CommentsForm from '@/components/PostPage/Comments/Form'
import { PostAuthor } from '@/models/postsModel'
import { Comment } from '@/models/commentsModel'
import CommentItem from '@/components/PostPage/Comments/CommentItem'

interface Props {
  postId: string
  author: PostAuthor
  comments?: Comment[]
}

const Comments = ({ postId, author, comments }: Props) => {
  return (
    <div className="flex w-full justify-center py-10 bg-white px-3">
      <section className={'container max-w-[880px]'}>
        <p className="mb-6 text-2xl font-semibold text-trout text-lg">
          Comments
        </p>
        <CommentsForm postId={postId} author={author} />
        {comments && (
          <div className={'mt-10'}>
            {comments?.map((comment) => (
              <CommentItem
                key={`${comment.id}-${comment.author.id}`}
                {...comment}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Comments
