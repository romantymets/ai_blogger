import Hero from '@/components/Hero'
import HeroContent from '@/components/HomePage/HeroContent'
import PostsList from '@/components/HomePage/PostsList'
import Pagination from '@/components/UIComponents/Pagination'
import { HOME } from '@/constants/navigationLinks'
import Search from '@/components/HomePage/Search'
import { Post } from '@/models/postsModel'
import { POST_LIMIT } from '@/constants/pagination'

interface HomeProps {
  posts?: Post[]
  searchData?: Post[]
  total: number
  page?: number
}

const HomePage = ({ posts, total, page, searchData }: HomeProps) => {
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
