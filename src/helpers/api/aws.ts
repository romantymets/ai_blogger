import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'
import { v4 as uuid } from 'uuid'
import { ApiError } from '@/helpers/api/exceptions/api-error'

const generateParams = (imageName: string) => {
  return {
    Bucket: process.env.BUCKET_NAME as string,
    Key: imageName,
    ACL: 'public-read',
  }
}

export const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string,
  },
})

interface SizeOption {
  width: number
  height: number
}

export async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  fileExtension: string,
  size?: SizeOption
): Promise<string> {
  const { width = 400, height = 500 } = size || {}
  const resizedImageBuffer = await sharp(file)
    .resize(width, height) // Specify your desired width or height for resizing
    .toBuffer()

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: fileExtension,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  return fileName
}

export const generateImageUrl = async (imageName: string) => {
  const getObjectParams = generateParams(imageName)
  const command = new GetObjectCommand(getObjectParams)
  return await getSignedUrl(s3Client, command, { expiresIn: 9600 })
}

export const deleteS3image = async (imageName: string) => {
  const getObjectParams = generateParams(imageName)
  const command = new DeleteObjectCommand(getObjectParams)
  await s3Client.send(command)
}

export const saveS3Image = async (
  image: Blob | null,
  imageSize?: SizeOption
) => {
  let fileName
  if (image) {
    const mimeType = image.type
    const fileExtension = mimeType.split('/')[1]

    const buffer = Buffer.from(await image.arrayBuffer())

    try {
      fileName = await uploadImageToS3(buffer, uuid(), fileExtension, imageSize)
    } catch (e) {
      throw new ApiError(500, 'Something went wrong with image save')
    }
  }

  return fileName
}
