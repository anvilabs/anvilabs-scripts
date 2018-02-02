# anvilabs-scripts

[![Build Status](https://img.shields.io/travis/anvilabs/anvilabs-scripts.svg)](https://travis-ci.org/anvilabs/anvilabs-scripts)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Anvilabs' CLI toolboxes for common scripts of our Node.JS / Backpack projects. See individual packages in [packages](./packages/).

## Installation

Install the wanted toolbox as a development dependency:

```bash
$ yarn add anvilabs-scripts-x --dev
# or
$ npm install anvilabs-scripts-x --save-dev
```

Available toolboxes include:
- [`anvilabs-scripts-node`](./packages/anvilabs-scripts-node).
- [`anvilabs-scripts-backpack`](./packages/anvilabs-scripts-backpack).

## Usage

The toolboxes hosted in these repo expose binaries called `anvilabs-scripts-x` (e.g. `anvilabs-scripts-node`). You can find all available scripts in the `src/scripts` of the respective package in [packages](./packages/).

This project actually dogfoods itself. If you look in the `package.json`, you'll
find scripts with `anvilabs-scripts-node {scriptName}`. This serves as an example of some
of the things you can do with `anvilabs-scripts-node` and other toolboxes in this repo.

### Overriding Config

You can specify your own config for some scripts bundled with a toolbox. There are various ways that it works, but basically if you want to have your own config for something, just add the config and the toolbox will use that instead of it's own internal config. In addition, all toolboxes expose their configs so you can use them and override only the parts of the config you need to.

This can be a very helpful way to make editor integration work for tools like
ESLint which require project-based ESLint configuration to be present to work.

So, if we were to do this for ESLint, you could create an `.eslintrc.js` with the
contents of:

```js
module.exports = {
  extends: './node_modules/anvilabs-scripts-node/eslint.js'
};
```

Or, for `babel`, a `.babelrc` with:

```json
{
  "presets": ["anvilabs-scripts-node/babel"]
}
```

Or, for `jest`:

```js
const jestConfig = require('anvilabs-scripts/jest');

module.exports = Object.assign(jestConfig, {
  // your overrides here
});
```

## Credits

Inspired by:

- [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts)
- [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)
- [d-scripts](https://github.com/trae/d-scripts)

## License

[MIT License](./LICENSE) © Anvilabs LLC
