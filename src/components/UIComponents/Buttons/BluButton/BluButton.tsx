import { ButtonHTMLAttributes } from 'react'
import { classNames } from '@/utils/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className?: string
  loading?: boolean
  rest?: any
}

const BluButton = ({ title, className, loading, ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        'bg-royalBlue text-white px-12 py-4 rounded-full w-full hover:bg-sky-700 disabled:opacity-75',
        className || ''
      )}
      {...rest}
    >
      {loading ? (
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <span> {title}</span>
      )}
    </button>
  )
}

export default BluButton
