'use client'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { userService } from '@/services/user.service'
import { alertService } from '@/services/alerts-service'
import { EDIT_PROFILE, HOME } from '@/constants/navigationLinks'
import TextInput from '@/components/UIComponents/Inputs/TextInput'

import Image from 'next/image'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import { IEditUserData } from '@/components/EditProfile/EditProfileComponent'
import RedButton from '@/components/UIComponents/Buttons/RedButton'
import Modal from '@/components/UIComponents/Modal'
import useModal from '@/hooks/useModal'
import DeleteUserComponent from '@/components/EditProfile/Form/DeleteUserComponent'

interface IDefaultValues {
  userName: string
  aboutUser: string
  image?: string
}

const Form = ({ data, id }: { data: IEditUserData | null; id: string }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { open, onOpen, onClose, cancelButtonRef } = useModal()

  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    onOpen()
  }

  const router = useRouter()

  const defaultValues: IDefaultValues = {
    userName: '',
    aboutUser: '',
    image: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = (data: IDefaultValues) => {
    setLoading(true)
    const formData = new FormData()

    formData.append('aboutUser', data.aboutUser)

    formData.append('userName', data.userName)

    if (selectedImage) {
      formData.append('image', selectedImage)
    }
    userService
      .updateUser(id, formData)
      .then(() => {
        alertService.success('User was successful updated')
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Updated failed')
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setSelectedImage(event?.target?.files[0])
    }
  }

  const handleDeleteUser = () => {
    setLoading(true)
    onClose()
    userService
      .deleteUser(id)
      .then(() => {
        alertService.success('User was successful deleted')
        setLoading(false)
        router.push(HOME.href)
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Deleted failed')
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (data) {
      setValue('userName', data.userName)
      setValue('aboutUser', data.aboutUser)
      if (data?.image) {
        setValue('image', data.image)
      }
    }
  }, [data, setValue])

  const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

  const [image] = watch(['image'])

  return (
    <Fragment>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-2">
            <h2 className="text-xl text-center font-semibold leading-7 text-gray-900">
              {EDIT_PROFILE.name}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-2 flex items-center justify-center gap-x-1">
              {imageUrl || image ? (
                <Image
                  src={imageUrl || image}
                  alt={'image'}
                  width={80}
                  height={80}
                  className={'rounded-full w-20 h-20'}
                />
              ) : (
                <UserCircleIcon
                  className="h-20 w-20 text-gray-300"
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
              <BluButton
                title={'Update'}
                type={'submit'}
                disabled={loading}
                loading={loading}
              />
              <RedButton
                title={'Delete'}
                disabled={loading}
                loading={loading}
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </div>
      </form>
      <Modal open={open} onClose={onClose} cancelButtonRef={cancelButtonRef}>
        <DeleteUserComponent
          handleDeleteUser={handleDeleteUser}
          onClose={onClose}
          cancelButtonRef={cancelButtonRef}
        />
      </Modal>
    </Fragment>
  )
}

export default Form
