'use client'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthGuard from '@/guards/AuthGuard'

import useGetUser from '@/hooks/useGetUser'
import useModal from '@/hooks/useModal'
import useImageUpload from '@/hooks/useImageUpload'

import Hero from '@/components/Hero'

import { alertService } from '@/services/alerts-service'
// import { postsService } from '@/services/posts.service'

import { HOME } from '@/constants/navigationLinks'

import RedButton from '@/components/UIComponents/Buttons/RedButton'
import Modal from '@/components/UIComponents/Modal'
import DeleteModalComponent from '@/components/UIComponents/DeleteModalComponent/DeleteModalComponent'
import HeroContent from '@/components/CreatePostPage/HeroContent'
import TextInput from '@/components/UIComponents/Inputs/TextInput'
import UploadImage from '@/components/UIComponents/UploadImage/UploadImage'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import TextArea from '@/components/UIComponents/Inputs/TextArea'

import defImage from 'public/postHero.jpg'

import { Post } from '@/models/postsModel'
import { revalidateService } from '@/services/revalidate.service'
import { postValidationSchema } from '@/helpers/validationSchema/postValidationSchema'
import { useUpdatePostMutation, useDeletePostsMutation } from '@/gql/graphql'

interface IDefaultValues {
  title: string
  content: string
  subtitle: string
}

const EditPostPage = ({ post }: { post: Post }) => {
  // const [loading, setLoading] = useState<boolean>(false)

  const { open, onOpen, onClose, cancelButtonRef } = useModal()

  const [updatePostMutation, { loading }] = useUpdatePostMutation()
  const [deletePostsMutation, { loading: deleteLoading }] =
    useDeletePostsMutation()

  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    onOpen()
  }

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

  const defaultValues = {
    title: post.title,
    content: post.content,
    subtitle: post?.subtitle || '',
    image: null,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(postValidationSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: IDefaultValues) => {
    if (!user?.userId) {
      alertService.error('Author not found')
      return
    }
    updatePostMutation({
      variables: {
        postInput: {
          content: data.content,
          subtitle: data.subtitle,
          title: data.title,
          id: post.id,
        },
        ...(selectedImage && { image: selectedImage }),
      },
    })
      .then(() => {
        alertService.success('Post was successful updated')
        router.push(HOME.href)
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Update failed')
      })
  }

  // const onSubmit = (data: IDefaultValues) => {
  //   if (!user?.userId) {
  //     alertService.error('Author not found')
  //     return
  //   }
  //   const formData = new FormData()
  //
  //   formData.append('title', data.title)
  //
  //   formData.append('subtitle', data.subtitle)
  //
  //   formData.append('content', data.content)
  //
  //   if (selectedImage) {
  //     formData.append('image', selectedImage)
  //   }
  //   setLoading(true)
  //   postsService
  //     .updatePost(post.id, formData)
  //     .then(() => {
  //       alertService.success('Post was successful updated')
  //       setLoading(false)
  //       router.push(HOME.href)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       alertService.error(error.message || 'Update failed')
  //       setLoading(false)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  const [title, subtitle] = watch(['title', 'subtitle'] as any)

  // const handleDelete = () => {
  //   onClose()
  //   postsService
  //     .deletePost(post.id)
  //     .then(() => {
  //       alertService.success('Post was successful deleted')
  //       revalidateService.revalidate(HOME.href).then(() => {
  //         router.push(HOME.href)
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       alertService.error(error.message || 'Deleted failed')
  //     })
  //     .finally(() => {})
  // }

  const handleDelete = () => {
    deletePostsMutation({
      variables: {
        id: post.id,
      },
    })
      .then(() => {
        alertService.success('Post was successful deleted')
        revalidateService.revalidate(HOME.href).then(() => {
          router.push(HOME.href)
        })
      })
      .catch((error) => {
        console.error(error)
        alertService.error(error.message || 'Deleted failed')
      })
  }

  return (
    <AuthGuard>
      <Hero image={imageUrl || post.image || defImage}>
        <HeroContent
          title={title}
          subtitle={subtitle}
          userName={user?.userName as string}
        />
      </Hero>
      <Fragment>
        <form
          className="my-8 w-full max-w-2xl px-3"
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
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message as string}
                    register={register('title')}
                  />
                </div>

                <div className="sm:col-span-6">
                  <TextInput
                    id={'subtitle'}
                    name={'subtitle'}
                    type={'text'}
                    label={'Subtitle'}
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
                    helperText={errors.content?.message as string}
                    register={register('content')}
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
                  title={'Update'}
                  type={'submit'}
                  disabled={loading}
                  loading={loading}
                />
                <RedButton
                  title={'Delete'}
                  disabled={deleteLoading}
                  loading={deleteLoading}
                  onClick={handleOpenModal}
                />
              </div>
            </div>
          </div>
        </form>
        <Modal open={open} onClose={onClose} cancelButtonRef={cancelButtonRef}>
          <DeleteModalComponent
            onClose={onClose}
            title={'Delete post'}
            handleDelete={handleDelete}
            description={
              'Are you sure you want to delete your post? All of your data will be permanently removed. This action cannot be undone.'
            }
            cancelButtonRef={cancelButtonRef}
          />
        </Modal>
      </Fragment>
    </AuthGuard>
  )
}

export default EditPostPage
