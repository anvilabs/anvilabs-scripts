const arrify = require('arrify');
const has = require('lodash.has');
const readPkgUp = require('read-pkg-up');

const {pkg} = readPkgUp.sync();

const hasPkgProp = props => arrify(props).some(prop => has(pkg, prop));

const hasPkgSubProp = pkgProp => props =>
  hasPkgProp(arrify(props).map(prop => `${pkgProp}.${prop}`));

const hasScript = hasPkgSubProp('scripts');
const hasPeerDep = hasPkgSubProp('peerDependencies');
const hasDep = hasPkgSubProp('dependencies');
const hasDevDep = hasPkgSubProp('devDependencies');
const hasAnyDep = args => [hasDep, hasDevDep, hasPeerDep].some(fn => fn(args));

module.exports = {
  hasPkgProp,
  hasScript,
  hasPeerDep,
  hasDep,
  hasDevDep,
  hasAnyDep,
};
