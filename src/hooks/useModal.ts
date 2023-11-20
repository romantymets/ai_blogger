import { useRef, useState } from 'react'

const useModal = (isOpenDefault = false) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault)
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null)

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
    cancelButtonRef,
  }
}
export default useModal
