'use client'
import Link from 'next/link'

import { Disclosure } from '@headlessui/react'

import dynamic from 'next/dynamic'

import { HOME } from '@/constants/navigationLinks'
import logo from 'public/logo.svg'
import Image from 'next/image'

const Profile = dynamic(() => import('@/components/Navbar/Profile'), {
  ssr: false,
})

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gallery fixed w-full top-0 z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href={HOME.href}>
                <Image src={logo} width={111} height={19} alt="Your Company" />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Profile />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Navbar
