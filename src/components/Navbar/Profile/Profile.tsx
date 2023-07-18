'use client'
import { Fragment } from 'react'

import Link from 'next/link'

import { Menu, Transition } from '@headlessui/react'

import { classNames } from '@/utils/classNames'

import { EDIT_PROFILE, LOG_IN, SIGN_UP } from '@/constants/navigationLinks'
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'

const profile = [LOG_IN, SIGN_UP, EDIT_PROFILE]

const Profile = () => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full border-solid border-2 border-text-stone-400 text-md focus:outline-none flex items-center px-1">
          <UserCircleIcon
            className="h-8 w-8 text-stone-600"
            aria-hidden="true"
          />
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
              {({ active }) => (
                <Link
                  href={href}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Profile
