const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const commonConfig = {
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
    'node_modules/(?!(<package-name>|<second-package-name>)/)',
  ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
  },
}

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/jest.db.setup.ts'],
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/**/*.test.ts?(x)'],
      preset: 'ts-jest',
      moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
      ...commonConfig,
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/tests/**/*.test.node.ts?(x)'],
      preset: 'ts-jest',
      moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
      watchPathIgnorePatterns: ['globalConfig'],
      ...commonConfig,
    },
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
