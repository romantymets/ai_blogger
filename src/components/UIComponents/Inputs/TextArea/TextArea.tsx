import { classNames } from '@/utils/classNames'

import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  id: string
  name: string
  type: string
  label: string
  autoComplete: string
  className?: string
  error?: boolean
  helperText?: string
  register?: UseFormRegisterReturn<any>
  rows?: number
  rest?: any
}

const TextArea = ({
  id,
  name,
  label,
  className,
  type,
  autoComplete,
  error,
  register,
  helperText,
  rows = 4,
  ...rest
}: InputProps) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={label}
          autoComplete={autoComplete}
          required
          className={classNames(
            'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6',
            className || '',
            error
              ? 'border-solid border-2 border-red-500'
              : 'focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          )}
          aria-invalid={error ? 'true' : 'false'}
          {...register}
          {...rest}
        />
        {error && helperText && (
          <p role="alert" className="mt-2 ml-3 text-xs text-red-500">
            {helperText}
          </p>
        )}
      </div>
    </div>
  )
}

export default TextArea
