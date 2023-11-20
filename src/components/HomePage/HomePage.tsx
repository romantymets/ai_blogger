import Hero from '@/components/Hero'
import HeroContent from '@/components/HomePage/HeroContent'
import PostsList from '@/components/HomePage/PostsList'
import Pagination from '@/components/UIComponents/Pagination'
import Search from '@/components/HomePage/Search'
import SortsLit from '@/components/HomePage/SortsList/SortsLit'

import { POST_LIMIT } from '@/constants/pagination'
import { HOME } from '@/constants/navigationLinks'

import { Post } from '@/models/postsModel'

interface HomeProps {
  posts?: Post[]
  searchData?: Post[]
  total: number
  page?: number
  sortOrder?: string
}

const HomePage = ({ posts, total, page, searchData, sortOrder }: HomeProps) => {
  return (
    <section>
      <Hero>
        <HeroContent />
      </Hero>
      <div className="w-full flex flex-col items-center">
        <div
          className={
            'container px-[24px] my-10 flex flex-col items-center justify-center'
          }
        >
          <Search searchData={searchData} />
          <SortsLit href={HOME.href} currentOrder={sortOrder} page={page} />
          {posts?.length > 0 ? (
            <PostsList posts={posts} />
          ) : (
            <div className={'min-h-[300px] flex items-center'}>
              <p className={'text-paleSky'}>Post will be added soon</p>
            </div>
          )}
          {total > POST_LIMIT && (
            <Pagination
              total={total}
              page={page}
              sortOrder={sortOrder}
              postsLength={posts?.length}
              href={HOME.href}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage
