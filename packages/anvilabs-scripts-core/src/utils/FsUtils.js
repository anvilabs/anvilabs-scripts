const path = require('path');
const fs = require('fs');

const readPkgUp = require('read-pkg-up');

const {path: pkgPath} = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});
const root = path.dirname(pkgPath);

const hasFile = base => (...pathSegments) =>
  fs.existsSync(path.resolve(base, ...pathSegments));

const hasFileRelative = hasFile(process.cwd());

const resolveFromRoot = (...pathSegments) => path.join(root, ...pathSegments);

module.exports = {
  hasFileRelative,
  resolveFromRoot,
};
