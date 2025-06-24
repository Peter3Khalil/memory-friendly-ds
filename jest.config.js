const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  roots: ['<rootDir>/tests'],
  testRegex: '.*\\.test\\.ts$',
  reporters: [
    'default',
    [
      'jest-stare',
      {
        resultDir: 'jest-stare',
        reportTitle: 'Linked List TDD Report',
        additionalResultsProcessors: [],
        coverageLink: './coverage/lcov-report/index.html',
      },
    ],
  ],
};
