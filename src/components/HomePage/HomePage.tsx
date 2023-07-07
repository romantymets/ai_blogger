import Link from 'next/link'
import Hero from '@/components/Hero'
import BluButton from '@/components/UIComponents/Buttons/BluButton'
import { SIGN_UP } from '@/constants/navigationLinks'

const HomePage = () => {
  return (
    <section>
      <Hero>
        <div className="flex flex-col content-center justify-center items-center sm:items-end">
          <h1 className="text-white text-6xl sm:text-8xl text-right mb-12">
            Write Your <br /> <span className="text-royalBlue">Article</span>{' '}
            <br /> here
          </h1>
          <Link href={SIGN_UP.href}>
            <BluButton title={SIGN_UP.name} />
          </Link>
        </div>
      </Hero>
    </section>
  )
}

export default HomePage
