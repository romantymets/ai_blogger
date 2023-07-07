'use client'
import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import TextInput from '@/components/UIComponents/Inputs/TextInput'
import { SIGN_UP, LOG_IN } from '@/constants/navigationLinks'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import { EmailRegExp, PasswordRegExp } from '@/constants/regExp'

interface IDefaultValues {
  userName: string
  email: string
  password: string
  aboutUser: string
}

const SignUpPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const defaultValues: IDefaultValues = {
    userName: '',
    email: '',
    password: '',
    aboutUser: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = (data: IDefaultValues) => console.log(data)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setSelectedImage(event?.target?.files[0])
    }
  }

  const handleImageClear = () => {
    setSelectedImage(null)
  }

  const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

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
                helperText={errors.userName?.message}
                register={register('userName', {
                  required: 'User Name is required',
                })}
              />
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

              <TextInput
                id={'password'}
                name={'password'}
                type={'password'}
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
                    className={'rounded-full w-20 h-20'}
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

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <BluButton title={SIGN_UP.name} type={'submit'} />
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
