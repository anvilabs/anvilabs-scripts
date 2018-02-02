#!/usr/bin/env node

const path = require('path');

const chalk = require('chalk');
const glob = require('glob');
const spawn = require('cross-spawn');

const logger = require('./utils/logger');

const SIGNAL_MESSAGES = {
  SIGKILL:
    'Exited too early. Either the process run out of memory or someone called "kill -9" on it.',
  SIGTERM:
    'Exited too early. Someone called "kill", "killall" or the system is shutting down.',
};

const getAvailableScripts = scriptsPath =>
  glob
    .sync(path.join(scriptsPath, '*'))
    .map(path.normalize)
    .map(scriptPath =>
      scriptPath
        .replace(scriptsPath, '')
        .replace(/__tests__/, '')
        .replace(/^\//, '')
        .replace(/\.js$/, '')
    )
    .filter(scriptName => !!scriptName);
const handleSignal = signal => {
  if (signal in SIGNAL_MESSAGES) {
    logger.info(SIGNAL_MESSAGES[signal]);
  }
};
const handleResult = result => {
  if (result.signal) {
    handleSignal(result.signal);
  }
  if (result.status > 0) {
    logger.error(`Exit code: ${result.status}`);
  }

  process.exit(result.status);
};

const runScript = root => {
  const scriptsPath = path.join(root, 'scripts');
  const scriptsAvailable = getAvailableScripts(scriptsPath);

  const isValidScript = scriptName => scriptsAvailable.includes(scriptName);

  const args = process.argv.slice(2); // eslint-disable-line no-magic-numbers
  const scriptIndex = args.findIndex(isValidScript);
  const scriptName = scriptIndex === -1 ? args[0] : args[scriptIndex];

  if (!isValidScript(scriptName)) {
    logger.error(`Unknown script: ${chalk.bold(scriptName)}.`);

    process.exit(1);
  }

  const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
  const scriptArgs = args.slice(scriptIndex + 1);

  const result = spawn.sync(
    'node',
    [
      ...nodeArgs,
      require.resolve(path.join(scriptsPath, scriptName)),
      ...scriptArgs,
    ],
    {stdio: 'inherit'}
  );

  handleResult(result);
};

module.exports = runScript;
