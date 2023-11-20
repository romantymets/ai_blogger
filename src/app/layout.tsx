import React from 'react'
import { Lora } from 'next/font/google'

import { ApolloWrapper } from '@/libs/apollo-provider'

import { classNames } from '@/utils/classNames'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Alert from '@/components/Alert'

import './globals.css'

const lora = Lora({ subsets: ['latin'] })

export const metadata = {
  title: 'AI | Blogger',
  description: 'Ai blogger learn app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body
          className={classNames(lora.className, 'min-h-screen flex flex-col')}
        >
          <Navbar />
          <Alert />
          <main className="flex flex-col flex-1 items-center overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </body>
      </ApolloWrapper>
    </html>
  )
}
