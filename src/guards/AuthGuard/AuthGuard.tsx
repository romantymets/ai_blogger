'use client'
import React, { Fragment, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { LOG_IN } from '@/constants/navigationLinks'
import { userService } from '@/services/user.service'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    if (!userService.userValue) {
      router.push(LOG_IN.href)
    }
  }, [router])

  return <Fragment>{children}</Fragment>
}

export default AuthGuard
