process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const {
  hasFileRelative,
  getRawArgs,
  hasPkgProp,
} = require('anvilabs-scripts-core/utils');
const jest = require('jest');

const rawArgs = getRawArgs();

const configArgs =
  !rawArgs.includes('-c') &&
  !rawArgs.includes('--config') &&
  !hasFileRelative('jest.config.js') &&
  !hasPkgProp('jest')
    ? ['--config', JSON.stringify(require('../config/jest.config'))] // eslint-disable-line global-require
    : [];

jest.run([...configArgs, ...rawArgs]);
