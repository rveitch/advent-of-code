/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  transform: {}, // Make ESM work
  testTimeout: 15000,
};

export default config;
