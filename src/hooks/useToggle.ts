import { useState } from 'react'

const useToggle = (isOpenDefault = false) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return {
    open: isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  }
}
export default useToggle
