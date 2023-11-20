import { Comment } from '@/models/commentsModel'
import CommentAuthor from '@/components/PostPage/Comments/CommentAuthor/CommentAuthor'
import RemoveButton from '@/components/PostPage/Comments/CommentItem/RemoveButoon'

const CommentItem = ({ content, author, createdAt, id, authorId }: Comment) => {
  return (
    <div className="flex flex-col my-3 bg-recentBg p-5">
      <div className={'flex justify-between'}>
        <CommentAuthor {...author} />
        <RemoveButton id={id} authorId={authorId} />
      </div>
      <p className="text-trout my-3">{content}</p>
      <p className={'mb-3 text-paleSky text-xs'}>
        {new Date(createdAt).toDateString()},
        {new Date(createdAt).toLocaleTimeString()}
      </p>
    </div>
  )
}

export default CommentItem
