import { ButtonHTMLAttributes } from 'react'
import { classNames } from '@/utils/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className?: string
  rest?: any
}

const BluButton = ({ title, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        'bg-royalBlue text-white px-12 py-4 rounded-full w-full hover:bg-sky-700',
        className || ''
      )}
      {...rest}
    >
      {title}
    </button>
  )
}

export default BluButton
