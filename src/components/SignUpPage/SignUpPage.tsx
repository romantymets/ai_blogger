'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import Link from 'next/link'
import Image from 'next/image'

import { UserCircleIcon } from '@heroicons/react/24/solid'

import { userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'

import useToggle from '@/hooks/useToggle'
import useImageUpload from '@/hooks/useImageUpload'

import TextInput from '@/components/UIComponents/Inputs/TextInput'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import PasswordInput from '@/components/UIComponents/Inputs/PasswordInput'
import UploadImage from '@/components/UIComponents/UploadImage/UploadImage'

import { SIGN_UP, LOG_IN } from '@/constants/navigationLinks'
import {
  RegistrationCredential,
  registrationValidationSchema,
} from '@/helpers/validationSchema/registrationValidationSchema'

const SignUpPage = () => {
  const {
    imageUrl,
    selectedImage,
    handleImageUpload,
    handleImageClear,
    handleDrag,
    handleDrop,
    dragActive,
  } = useImageUpload()

  const { open: loading, onOpen, onClose } = useToggle()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationValidationSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: RegistrationCredential) => {
    onOpen()
    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('aboutUser', data.aboutUser)
    if (selectedImage) {
      formData.append('image', selectedImage)
    }
    userService
      .register(formData)
      .then(() => {
        alertService.success('Registration successful')
        onClose()
        router.push(LOG_IN.href)
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Registration failed')
        onClose()
      })
      .finally(() => {
        onClose()
      })
  }

  return (
    <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl text-center font-semibold leading-7 text-gray-900">
            {SIGN_UP.name}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <TextInput
                id={'userName'}
                name={'userName'}
                type={'text'}
                label={'User Name'}
                autoComplete={'userName'}
                error={Boolean(errors.userName)}
                helperText={errors?.userName?.message as string}
                register={register('userName')}
              />
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
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="aboutUser"
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('aboutUser')}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={'image'}
                    width={80}
                    height={80}
                    className={'rounded-full w-20 h-20 object-cover'}
                  />
                ) : (
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  onClick={handleImageClear}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <UploadImage
              handleImageUpload={handleImageUpload}
              label={'Cover photo'}
              image={imageUrl}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              dragActive={dragActive}
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <BluButton
              title={SIGN_UP.name}
              type={'submit'}
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          <span className="mr-2">Have an account?</span>
          <Link
            href={LOG_IN.href}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {LOG_IN.name}
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignUpPage
