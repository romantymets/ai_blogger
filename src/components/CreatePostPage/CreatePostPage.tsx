'use client'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import AuthGuard from '@/guards/AuthGuard'

import useGetUser from '@/hooks/useGetUser'
import useToggle from '@/hooks/useToggle'
import useImageUpload from '@/hooks/useImageUpload'

import Hero from '@/components/Hero'

import { alertService } from '@/services/alerts-service'
import { postsService } from '@/services/posts.service'

import { CREATE_POST, HOME } from '@/constants/navigationLinks'

import TextInput from '@/components/UIComponents/Inputs/TextInput'
import UploadImage from '@/components/UIComponents/UploadImage/UploadImage'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import TextArea from '@/components/UIComponents/Inputs/TextArea'

import defImage from 'public/postHero.jpg'
import HeroContent from '@/components/CreatePostPage/HeroContent'

interface IDefaultValues {
  title: string
  content: string
  subtitle?: string
}

const CreatePostPage = () => {
  const router = useRouter()

  const { user } = useGetUser()

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

  const defaultValues: IDefaultValues = {
    title: '',
    content: '',
    subtitle: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = (data: IDefaultValues) => {
    if (!user?.userId) {
      alertService.error('Updated not found')
      return
    }
    const formData = new FormData()

    formData.append('title', data.title)

    formData.append('subtitle', data.subtitle)

    formData.append('content', data.content)

    formData.append('userId', user.userId)

    if (selectedImage) {
      formData.append('image', selectedImage)
    }
    onOpen()
    postsService
      .create(formData)
      .then(() => {
        alertService.success('Post was successful created')
        onClose()
        router.push(HOME.href)
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Created failed')
        onClose()
      })
      .finally(() => {
        onClose()
      })
  }

  const [title, subtitle] = watch(['title', 'subtitle'])

  return (
    <AuthGuard>
      <Hero image={imageUrl || defImage}>
        <HeroContent
          title={title}
          subtitle={subtitle}
          userName={user?.userName}
        />
      </Hero>
      <Fragment>
        <form
          className="my-8 w-full max-w-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="pb-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <TextInput
                    id={'title'}
                    name={'title'}
                    type={'text'}
                    label={'Title'}
                    autoComplete={'title'}
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    register={register('title', {
                      required: 'Title is required',
                    })}
                  />
                </div>

                <div className="sm:col-span-6">
                  <TextInput
                    id={'subtitle'}
                    name={'subtitle'}
                    type={'text'}
                    label={'Subtitle'}
                    autoComplete={'subtitle'}
                    register={register('subtitle')}
                  />
                </div>

                <div className="col-span-full">
                  <TextArea
                    id={'content'}
                    name={'content'}
                    type={'text'}
                    label={'Article'}
                    autoComplete={'content'}
                    rows={15}
                    error={Boolean(errors.content)}
                    helperText={errors.content?.message}
                    register={register('content', {
                      required: 'Article is required',
                    })}
                  />
                </div>

                <UploadImage
                  handleImageUpload={handleImageUpload}
                  label={'Cover article image'}
                  image={imageUrl}
                  handleImageClear={handleImageClear}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  dragActive={dragActive}
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <BluButton
                  title={CREATE_POST.name}
                  type={'submit'}
                  disabled={loading}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    </AuthGuard>
  )
}

export default CreatePostPage
