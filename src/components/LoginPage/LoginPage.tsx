'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useToggle from '@/hooks/useToggle'

import { userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'

import { HOME, SIGN_UP, RESET_PASSWORD } from '@/constants/navigationLinks'
import { EmailRegExp, PasswordRegExp } from '@/constants/regExp'

import TextInput from '@/components/UIComponents/Inputs/TextInput'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import PasswordInput from '@/components/UIComponents/Inputs/PasswordInput/PasswordInput'

interface IDefaultValues {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const { open: loading, onOpen, onClose } = useToggle()
  const defaultValues: IDefaultValues = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = ({ email, password }: IDefaultValues) => {
    onOpen()
    return userService
      .login(email, password)
      .then(() => {
        alertService.success('Authorization successful')
        onClose()
        router.push(HOME.href)
      })
      .catch((e) => {
        console.error(e)
        alertService.error(e.message)
        onClose()
      })
  }

  return (
    <Fragment>
      <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-3 lg:px-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              id={'email'}
              name={'email'}
              type={'email'}
              autoComplete={'email'}
              label={'Email address'}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: EmailRegExp,
                  message: 'Email not correct',
                },
              })}
            />

            <PasswordInput
              id={'password'}
              name={'password'}
              autoComplete={'password'}
              label={'Password'}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              register={register('password', {
                required: 'Password is required',
                pattern: {
                  value: PasswordRegExp,
                  message:
                    'Minimum eight characters, at least one letter and one number',
                },
              })}
            />

            <p className="mt-10 text-right text-sm text-gray-500">
              <Link
                href={RESET_PASSWORD.href}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </p>

            <div>
              <BluButton
                title={'Sign in'}
                type="submit"
                loading={loading}
                disabled={loading}
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <span className="mr-2">Don't have an account?</span>
            <Link
              href={SIGN_UP.href}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {SIGN_UP.name}
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginPage
