import React from 'react'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return <section className="mt-16">{children}</section>
}

export default Wrapper
