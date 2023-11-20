'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useResetPasswordMutation } from '@/gql/graphql'

// import useToggle from '@/hooks/useToggle'

import { userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'

import {
  HOME,
  LOG_IN,
  RESET_PASSWORD,
  SIGN_UP,
} from '@/constants/navigationLinks'

import TextInput from '@/components/UIComponents/Inputs/TextInput'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import PasswordInput from '@/components/UIComponents/Inputs/PasswordInput/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ResetPasswordCredential,
  resetPasswordValidationSchema,
} from '@/helpers/validationSchema/resetPasswordValidationSchema'

const ResetPasswordPage = () => {
  const router = useRouter()
  // const { open: loading, onOpen, onClose } = useToggle()

  const [resetPasswordMutation, { loading }] = useResetPasswordMutation()

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues,
  })

  const onSubmit = (data: ResetPasswordCredential) => {
    return resetPasswordMutation({
      variables: {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    })
      .then(({ data }) => {
        const currentUser = userService.userValue
        alertService.success('Password successful updated')
        if (currentUser?.userId === data?.resetPassword?.userId) {
          userService.logout()
          router.push(LOG_IN.href)
          return
        }
        router.push(HOME.href)
      })
      .catch((e) => {
        console.error(e)
        alertService.error(e.message)
      })
  }

  // const onSubmit = (data: ResetPasswordCredential) => {
  //   onOpen()
  //   return userService
  //     .resetPassword(data)
  //     .then((result) => {
  //       const currentUser = userService.userValue
  //       alertService.success('Password successful updated')
  //       onClose()
  //       if (currentUser?.userId === result?.userId) {
  //         userService.logout()
  //         router.push(LOG_IN.href)
  //         return
  //       }
  //       router.push(HOME.href)
  //     })
  //     .catch((e) => {
  //       console.error(e)
  //       alertService.error(e.message)
  //       onClose()
  //     })
  // }

  return (
    <Fragment>
      <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-3 lg:px-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
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
              helperText={errors.email?.message as string}
              register={register('email')}
            />

            <PasswordInput
              id={'password'}
              name={'password'}
              autoComplete={'password'}
              label={'Password'}
              error={Boolean(errors.password)}
              helperText={errors.password?.message as string}
              register={register('password')}
            />

            <PasswordInput
              id={'confirmPassword'}
              name={'confirmPassword'}
              autoComplete={'password'}
              label={'Confirm password'}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message as string}
              register={register('confirmPassword')}
            />

            <div>
              <BluButton
                title={RESET_PASSWORD.name}
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

export default ResetPasswordPage
