import { ChangeEvent, DragEvent, useState } from 'react'

const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setSelectedImage(event?.target?.files[0])
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true)
    } else if (e?.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e?.dataTransfer?.files && e?.dataTransfer?.files[0]) {
      setSelectedImage(e?.dataTransfer?.files[0])
    }
  }

  const handleImageClear = () => {
    setSelectedImage(null)
  }

  const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

  return {
    selectedImage,
    handleImageUpload,
    dragActive,
    handleDrop,
    handleDrag,
    handleImageClear,
    imageUrl,
  }
}
export default useImageUpload
