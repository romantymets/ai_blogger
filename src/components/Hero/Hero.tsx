import { ReactNode } from 'react'

import Image from 'next/image'

import defImage from 'public/hero.jpg'

interface HeroProps {
  image?: string
  children?: ReactNode
}

const Hero = ({ image, children }: HeroProps) => {
  return (
    <section className="relative w-screen w-max-full h-screen min-h-max flex justify-center items-center pt-16">
      <Image
        src={image || defImage}
        alt={'hero'}
        fill={true}
        className="-z-10 absolute"
      />
      {children}
    </section>
  )
}

export default Hero
