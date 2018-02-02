const parseArgs = require('yargs-parser');

const getPositionalArgs = rawArgs => {
  const positionalArgs = parseArgs(rawArgs)._;

  return positionalArgs;
};

module.exports = getPositionalArgs;
