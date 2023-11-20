/** @type {import('next').NextConfig} */
const appConfig = require('./config.ts')

const nextConfig = {
  images: {
    domains: [
      'localhost:3000',
      'res.cloudinary.com',
      appConfig.AWS_S3_BUCKET,
      appConfig.CANONICAL_URL,
    ],
    minimumCacheTTL: 2628000,
  },
  env: {
    DATABASE_URL: appConfig.DATABASE_URL,
    JWT_ACCESS_SECRET: appConfig.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: appConfig.JWT_REFRESH_SECRET,
    BUCKET_NAME: appConfig.BUCKET_NAME,
    REGION: appConfig.REGION,
    AWS_S3_ACCESS_KEY: appConfig.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: appConfig.AWS_S3_SECRET_KEY,
    ACCESS_TOKEN_MAX_AGE: appConfig.ACCESS_TOKEN_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE: appConfig.REFRESH_TOKEN_MAX_AGE,
    CANONICAL_URL: appConfig.CANONICAL_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
}

module.exports = nextConfig
