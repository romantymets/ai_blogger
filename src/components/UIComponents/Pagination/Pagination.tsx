import Link from 'next/link'
import { POST_LIMIT } from '@/constants/pagination'

interface IPagination {
  page?: number
  total?: number
  href: string
  postsLength?: number
  sortOrder?: string
}

const btnClassName =
  'relative mr-3 inline-flex items-center rounded-md border border-royalBlue bg-white px-4 py-2 text-sm font-medium text-royalBlue hover:bg-gray-50 disabled:opacity-75 disabled:border-gray-300 disabled:text-gray-300'

const Pagination = ({
  page = 1,
  total = 0,
  href,
  postsLength = 0,
  sortOrder,
}: IPagination) => {
  const currentPage = Number(page)
  const isLastPage = postsLength < POST_LIMIT
  const showingRes = !isLastPage
    ? currentPage * POST_LIMIT
    : (currentPage - 1) * POST_LIMIT + postsLength
  const isFirstPage = currentPage <= 1
  return (
    <div className="flex flex-col w-full mt-10 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col items-center">
        <div className={'mb-3'}>
          <p className="text-sm text-gray-700">
            {`Showing ${showingRes} of ${total} results`}
          </p>
        </div>
        <div>
          {isFirstPage ? (
            <button className={btnClassName} disabled={true}>
              Previous
            </button>
          ) : (
            <Link
              className={btnClassName}
              scroll={false}
              href={{
                pathname: href,
                query: {
                  page: currentPage - 1,
                  ...{ ...(sortOrder && { sortOrder }) },
                },
              }}
              replace
            >
              Previous
            </Link>
          )}
          <span className="relative inline-flex items-center mx-3 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            {page}
          </span>
          {isLastPage ? (
            <button className={btnClassName} disabled>
              Next
            </button>
          ) : (
            <Link
              className={btnClassName}
              href={{
                pathname: href,
                query: {
                  page: currentPage + 1,
                  ...{ ...(sortOrder && { sortOrder }) },
                },
              }}
              replace
              scroll={false}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pagination
