/** @type {import('next').NextConfig} */
const appConfig = require('./config.ts')

const nextConfig = {
  images: {
    domains: ['localhost:3000', 'res.cloudinary.com', appConfig.AWS_S3_BUCKET],
    minimumCacheTTL: 2628000,
  },
  env: {
    DATABASE_URL: appConfig.DATABASE_URL,
    JWT_ACCESS_SECRET: appConfig.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: appConfig.JWT_REFRESH_SECRET,
    BUCKET_NAME: appConfig.BUCKET_NAME,
    REGION: appConfig.REGION,
    ACCESS_KEY: appConfig.ACCESS_KEY,
    SECRET_KEY: appConfig.SECRET_KEY,
  },
}

module.exports = nextConfig
