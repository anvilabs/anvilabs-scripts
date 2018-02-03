#!/usr/bin/env node

const path = require('path');

const chalk = require('chalk');
const glob = require('glob');
const spawn = require('cross-spawn');

const getRawArgs = require('./utils/getRawArgs');
const logger = require('./utils/logger');

const SIGNAL_MESSAGES = {
  SIGKILL:
    'Exited too early. Either the process run out of memory or someone called "kill -9" on it.',
  SIGTERM:
    'Exited too early. Someone called "kill", "killall" or the system is shutting down.',
};

const getScriptsPathsForRoot = scriptsRoot =>
  glob
    .sync(path.join(scriptsRoot, '*'))
    .map(path.normalize)
    .filter(scriptPath => !scriptPath.includes('__tests__'))
    .map(scriptPath => scriptPath.replace(/\.js$/, ''));
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
    logger.error(`Exit code: ${result.status}.`);
  }

  process.exit(result.status);
};

const runScript = roots => {
  const scriptsRoots = roots.map(root => path.join(root, 'scripts'));
  const scriptsPaths = scriptsRoots
    .map(scriptsRoot => getScriptsPathsForRoot(scriptsRoot))
    .reduce((a, b) => a.concat(b), []);
  const scriptsPathsForNames = scriptsPaths.reduce(
    (acc, scriptPath) => ({
      ...acc,
      [path.basename(scriptPath)]: scriptPath,
    }),
    {}
  );
  const scriptsNames = Object.keys(scriptsPathsForNames);
  const isValidScript = scriptName => scriptsNames.includes(scriptName);

  const args = getRawArgs();
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
    [...nodeArgs, scriptsPathsForNames[scriptName], ...scriptArgs],
    {stdio: 'inherit'}
  );

  handleResult(result);
};

module.exports = runScript;
