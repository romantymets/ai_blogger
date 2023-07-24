import { Fragment } from 'react'
import LoginPage from '@/components/LoginPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'login new user',
}

const Login = () => {
  return (
    <Fragment>
      <LoginPage />
    </Fragment>
  )
}

export default Login
