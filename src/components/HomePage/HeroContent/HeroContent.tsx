'use client'
import Link from 'next/link'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import { CREATE_POST, SIGN_UP } from '@/constants/navigationLinks'
import useGetUser from '@/hooks/useGetUser'

const HeroContent = () => {
  const { user } = useGetUser()
  const button = {
    name: user ? CREATE_POST.name : SIGN_UP.name,
    href: user ? CREATE_POST.href : SIGN_UP.href,
  }
  return (
    <div className="flex flex-col content-center justify-center items-center sm:items-end">
      <h1 className="text-white text-6xl sm:text-8xl text-right mb-12">
        Write Your <br /> <span className="text-royalBlue">Article</span> <br />{' '}
        here
      </h1>
      <Link href={button.href}>
        <BluButton title={button.name} />
      </Link>
    </div>
  )
}

export default HeroContent
