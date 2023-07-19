/** @type {import('next').NextConfig} */
const appConfig = require('./config.ts')

const nextConfig = {
  reactStrictMode: true,
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
