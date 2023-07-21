import { Fragment } from 'react'
import { Metadata } from 'next'

import { RESET_PASSWORD } from '@/constants/navigationLinks'
import ResetPasswordPage from '@/components/ResetPasswordPage'

export const metadata: Metadata = {
  title: RESET_PASSWORD.name,
  description: RESET_PASSWORD.name,
}

const ResetPassword = () => {
  return (
    <Fragment>
      <ResetPasswordPage />
    </Fragment>
  )
}

export default ResetPassword
