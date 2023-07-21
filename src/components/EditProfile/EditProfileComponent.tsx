import AuthGuard from '@/guards/AuthGuard'
import { Fragment } from 'react'

const EditProfileComponent = () => {
  return (
    <Fragment>
      <AuthGuard>
        <section>edit profile</section>
      </AuthGuard>
    </Fragment>
  )
}

export default EditProfileComponent
