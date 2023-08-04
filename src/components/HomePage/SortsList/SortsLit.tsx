import Link from 'next/link'
import { classNames } from '@/utils/classNames'

export const newest = {
  key: 'newest',
  title: 'Newest',
}

export const mostPopular = {
  key: 'most-popular',
  title: 'Most Popular',
}

const orderData = [newest, mostPopular]

const SortsLit = ({
  href,
  currentOrder = newest.key,
}: {
  href: string
  currentOrder: string
}) => {
  return (
    <section
      className={
        'flex flex-wrap w-full gap-[20px] pb-10 items-center justify-center md:justify-start'
      }
    >
      {orderData.map(({ key, title }) => (
        <Link
          className={classNames(
            'font-bold hover:text-amber-700',
            currentOrder === key ? 'text-amber-700' : 'text-trout'
          )}
          key={key}
          scroll={false}
          href={{
            pathname: href,
            query: {
              sortOrder: key,
            },
          }}
          replace
        >
          {title}
        </Link>
      ))}
    </section>
  )
}

export default SortsLit
