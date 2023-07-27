import React, { Fragment } from 'react'

import LoadingSkeleton from '@/components/HomePage/Search/LoadingSkeleton'
import SearchCard from '@/components/HomePage/Search/SearchResultList/SearchCard'
import { Post } from '@/models/postsModel'

interface ISearchResProps {
  data?: Post[]
  isLoading: boolean
  open: boolean
}

const SearchResultList = ({ data, isLoading, open }: ISearchResProps) => {
  return (
    <Fragment>
      {open && (
        <div className="flex items-center z-10 w-full absolute justify-center min-h-[54px] bg-white border border-gray-300 border-t-0">
          <div className="w-full">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <Fragment>
                {data?.length ? (
                  <div
                    className={
                      'flex flex-col gap-2 max-h-[380px] overflow-auto'
                    }
                  >
                    {data.map((post) => (
                      <SearchCard key={post.id} {...post} />
                    ))}
                  </div>
                ) : (
                  <p className={'tex-xs text-paleSky w-full text-center'}>
                    Nothing found
                  </p>
                )}
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default SearchResultList
