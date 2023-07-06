import { Inter } from 'next/font/google'

import Footer from '@/components/Footer'

import Navbar from '../components/Navbar'
import './globals.css'
import { classNames } from '@/utils/classNames'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={classNames(inter.className, 'h-screen flex flex-col')}>
        <Navbar />
        <main className="flex flex-col flex-1 items-center overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
