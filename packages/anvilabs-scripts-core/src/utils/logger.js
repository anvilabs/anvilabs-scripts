const chalk = require('chalk');

const NAMESPACE = 'anvilabs-scripts';
const LEVEL_TO_CONSOLE_METHOD = {
  info: 'info',
  warn: 'warn',
  error: 'error',
};
const LEVEL_TO_COLOR_MAP = {
  info: 'blue',
  warn: 'yellow',
  error: 'red',
};

const formatLevel = level => chalk[LEVEL_TO_COLOR_MAP[level]](level);
const makeLogFn = level => (...data) => {
  // eslint-disable-next-line no-console
  console[LEVEL_TO_CONSOLE_METHOD[level]](
    chalk.dim(`[${NAMESPACE}]`),
    formatLevel(level),
    ...data
  );
};

const logger = {
  info: makeLogFn('info'),
  warn: makeLogFn('warn'),
  error: makeLogFn('error'),
};

module.exports = logger;
