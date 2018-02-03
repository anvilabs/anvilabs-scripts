#!/usr/bin/env node

const {runScript} = require('anvilabs-scripts-core');
const resolvePkg = require('resolve-pkg');

runScript([
  __dirname,
  resolvePkg('anvilabs-scripts-node/src', {cwd: __dirname}),
]);
