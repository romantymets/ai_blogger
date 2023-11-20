import React from 'react'
import { Post } from '@/models/postsModel'
import AuthorComponent from '@/components/UIComponents/PostCard/AuthorComponent'
import EditButton from '@/components/PostPage/PostBody/EditButtom/EditButton'

const PostBody = ({
  author,
  content,
  authorId,
  createdAt,
  id,
  likes,
  comments,
  popularity,
}: Post) => {
  return (
    <section className={'container max-w-[860px] flex flex-col px-3.5'}>
      <div className={'flex justify-between items-center mb-3'}>
        <div className={'text-paleSky text-sm flex items-center'}>
          <span>Published</span>
          <div className={'h-[1px] w-[20px] bg-silver mx-5'} />
          <span>{new Date(createdAt).toDateString()}</span>
        </div>
        <EditButton postId={id} authorId={authorId} />
      </div>
      <p className="text-trout">{content}</p>
      <div className={'h-[1px] w-full bg-silver mt-10 mb-5'} />
      <AuthorComponent
        author={author}
        authorId={authorId}
        likes={likes}
        postId={id}
        comments={comments?.length}
        popularity={popularity}
      />
    </section>
  )
}

export default PostBody
