/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.(m?js|ts)$': 'babel-jest',
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  clearMocks: true,
};

export default config;
