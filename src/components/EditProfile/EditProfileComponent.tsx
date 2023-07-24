'use client'
import AuthGuard from '@/guards/AuthGuard'
import { useEffect, useState } from 'react'
import Spinner from '@/components/UIComponents/Spinner'
import Form from '@/components/EditProfile/Form'
import { userService } from '@/services/user.service'

export interface IEditUserData {
  userId: string
  email: string
  userName: string
  image?: string
  aboutUser?: string
}

const EditProfileComponent = ({ id }) => {
  const [data, setData] = useState<IEditUserData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      userService
        .getUserById(id)
        .then(({ data }) => {
          setLoading(false)
          setData(data)
        })
        .catch((e) => {
          setLoading(false)
          console.error(e)
        })
    }
  }, [id])

  return (
    <AuthGuard>
      {loading ? (
        <Spinner className={'mt-[200px]'} />
      ) : (
        <Form data={data} id={id} />
      )}
    </AuthGuard>
  )
}

export default EditProfileComponent
