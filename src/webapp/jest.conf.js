const tsconfig = require('./tsconfig.json');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost/',
  coverageDirectory: '<rootDir>/target/test-results/',
  testMatch: ['<rootDir>/app/**/@(*.)@(spec.ts?(x))'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  reporters: ['default', ['jest-junit', { outputDirectory: './target/test-results/', outputName: 'TESTS-results-jest.xml' }]],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
      compiler: 'typescript',
      diagnostics: false,
    },
    DEVELOPMENT: false,
  },
  setupFilesAfterEnv: ['<rootDir>/app/setup-tests.ts'],
};
