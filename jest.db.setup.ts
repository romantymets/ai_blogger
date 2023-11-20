import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

beforeAll(async () => {
  // Initialize Prisma client
  prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  })

  await prisma.$connect()
})

afterAll(async () => {
  // Disconnect Prisma client
  await prisma.$disconnect()
})

export { prisma }
