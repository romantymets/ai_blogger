import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

const generateParams = (imageName: string) => {
  const bucketName = process.env.BUCKET_NAME as string
  return {
    Bucket: bucketName,
    Key: imageName,
  }
}

export const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
})

export async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  fileExtension: string
): Promise<string> {
  const resizedImageBuffer = await sharp(file)
    .resize(400, 500) // Specify your desired width or height for resizing
    .toBuffer()

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: `${Date.now()}-${fileName}`,
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
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  return url
}

export const deleteS3image = async (imageName: string) => {
  const getObjectParams = generateParams(imageName)
  const command = new DeleteObjectCommand(getObjectParams)
  await s3Client.send(command)
}
