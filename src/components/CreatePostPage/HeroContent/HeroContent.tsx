import { CREATE_POST } from '@/constants/navigationLinks'
import React from 'react'

interface HeroContentProps {
  title: string
  subtitle?: string
  userName?: string
}

const HeroContent = ({ title, subtitle, userName }: HeroContentProps) => {
  return (
    <div className={'px-6 max-w-3xl flex flex-col justify-center items-center'}>
      <h2 className={'text-4xl font-bold text-white text-center mb-3'}>
        {title || CREATE_POST.name}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-sm text-center text-natural200 mb-3">
          {subtitle}
        </p>
      )}
      {userName && (
        <p className="text-xl font-bold text-white text-center">
          by {userName}
        </p>
      )}
    </div>
  )
}

export default HeroContent
