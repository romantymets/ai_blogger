import { FC } from 'react'

import AboutAuthor from '@/components/AuthorPage/AboutAuthor'
import PostsList from '@/components/HomePage/PostsList'
import Pagination from '@/components/UIComponents/Pagination'

import { AUTHOR } from '@/constants/navigationLinks'

import { Post } from '@/models/postsModel'
import { Author } from '@/models/userModel'

interface AuthorProps {
  posts: Post[]
  author: Author
  total: number
  page?: number
}

const AuthorPage: FC<AuthorProps> = ({ posts, author, total, page }) => {
  return (
    <section className={'flex w-full justify-center my-10'}>
      <div
        className={
          'container max-w-[1240px] px-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 items-center'
        }
      >
        <AboutAuthor {...author} postsQuantity={total} />
        <section className={'max-w-2xl w-full'}>
          <PostsList posts={posts} />
          <Pagination
            page={page}
            total={total}
            href={`${AUTHOR.href}/${author.userId}`}
            postsLength={posts?.length}
          />
        </section>
      </div>
    </section>
  )
}

export default AuthorPage
