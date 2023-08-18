module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/__tests__'],
    transform: {
      '^.+\\.ts?$': ['ts-jest', {
        tsconfig: 'tsconfig.spec.json'
      }]
    },
    testRegex: '/__tests__/.*\\.(test|spec)?\\.ts$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts'
    ],
  };
  