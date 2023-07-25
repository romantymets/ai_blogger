import React, { ChangeEvent, DragEvent } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'

interface UploadImageProps {
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  handleDrag: (e: DragEvent<HTMLDivElement>) => void
  handleDrop: (e: DragEvent<HTMLDivElement>) => void
  dragActive: boolean
  label?: string
  image?: string
  handleImageClear?: () => void
}

const UploadImage = ({
  handleImageUpload,
  label = 'Cover photo',
  image,
  handleImageClear,
  handleDrag,
  handleDrop,
  dragActive,
}: UploadImageProps) => {
  return (
    <div className="col-span-full">
      <div className={'flex items-center'}>
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {image && handleImageClear && (
          <button
            type="button"
            onClick={handleImageClear}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-4"
          >
            Clear
          </button>
        )}
      </div>
      <div
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative"
        onDragEnter={handleDrag}
      >
        {dragActive && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={'absolute top-0 h-full w-full right-0 left-0 bottom-0'}
          />
        )}
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadImage
