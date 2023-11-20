import { Fragment } from 'react'
import SignUpPage from '@/components/SignUpPage'
import Wrapper from '@/components/UIComponents/Wrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign-Up',
  description: 'Create new user',
}

const SignUp = () => {
  return (
    <Fragment>
      <Wrapper>
        <SignUpPage />
      </Wrapper>
    </Fragment>
  )
}

export default SignUp
