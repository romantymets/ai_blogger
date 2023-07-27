'use client'
import { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Menu, Transition } from '@headlessui/react'

import { classNames } from '@/utils/classNames'

import {
  CREATE_POST,
  EDIT_PROFILE,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
} from '@/constants/navigationLinks'
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import useGetUser from '@/hooks/useGetUser'

import { userService } from '@/services/user.service'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const [userImage, setUserImage] = useState<string | null>(null)
  const { user } = useGetUser()
  const router = useRouter()

  useEffect(() => {
    if (user?.userId) {
      userService
        .getUserById(user.userId)
        .then(({ data }) => {
          if (data?.image) {
            setUserImage(data.image)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setUserImage(null)
    }
  }, [user?.userId])

  const handleLogOut = () => {
    userService.logout()
    router.push(LOG_IN.href)
  }

  const profile = user
    ? [
        {
          name: EDIT_PROFILE.name,
          href: `${EDIT_PROFILE.href}/${user.userId}`,
        },
        CREATE_POST,
        LOG_OUT,
      ]
    : [LOG_IN, SIGN_UP]

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full border-solid border-2 border-text-stone-400 text-md focus:outline-none flex items-center px-1">
          {!userImage ? (
            <UserCircleIcon
              className="h-8 w-8 text-stone-600"
              aria-hidden="true"
            />
          ) : (
            <Fragment>
              {userImage ? (
                <Image
                  src={userImage}
                  width={24}
                  height={24}
                  style={{
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                  }}
                  alt={'profile'}
                />
              ) : (
                <div
                  className={
                    'w-8 h-8 flex items-center justify-center text-stone-600'
                  }
                >
                  {user.userName[0]}
                </div>
              )}
            </Fragment>
          )}
          <Bars3Icon className="h-6 w-6 text-stone-600" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {profile.map(({ name, href }, index) => (
            <Menu.Item key={`${name}-${index}`}>
              {({ active }) =>
                name !== LOG_OUT.name ? (
                  <Link
                    href={href}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {name}
                  </Link>
                ) : (
                  <button
                    onClick={handleLogOut}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'flex px-4 py-2 text-sm text-gray-700 w-full'
                    )}
                  >
                    {name}
                  </button>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Profile
