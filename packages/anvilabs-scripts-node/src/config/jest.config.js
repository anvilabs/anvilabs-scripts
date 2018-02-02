const {
  hasFileRelative,
  resolveFromRoot,
} = require('anvilabs-scripts-core/utils');

const IGNORES = [
  '/node_modules/',
  '/fixtures/',
  '/__tests__/helpers/',
  '__mocks__',
];

module.exports = {
  globals: {
    'ts-jest': {
      useBabelrc: true,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  rootDir: resolveFromRoot('.'),
  roots: ['<rootDir>/src'],
  setupTestFrameworkScriptFile: hasFileRelative('jest.setup.js')
    ? '<rootDir>/jest.setup.js'
    : undefined,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*-test.(js|ts)'],
  testPathIgnorePatterns: [...IGNORES],
  transform: {
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
};
