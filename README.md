# anvilabs-scripts

[![Build Status](https://img.shields.io/travis/anvilabs/anvilabs-scripts.svg)](https://travis-ci.org/anvilabs/anvilabs-scripts)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Opinionated CLI toolkits for our Node / Backpack projects. See individual packages in [packages](./packages/).

> **NOTE**: we use TypeScript in our projects, so these toolkits are specifically tailored for usage with TypeScript.

## Installation

Install the wanted toolkit as a development dependency:

```bash
$ yarn add anvilabs-scripts-x --dev
# or
$ npm install anvilabs-scripts-x --save-dev
```

> **NOTE**: it includes all the dependencies (babel, eslint, tslint, typescript, prettier, jest, etc) so you don't have to install them.

Available toolkits include:

* [`anvilabs-scripts-node`](./packages/anvilabs-scripts-node).
* [`anvilabs-scripts-backpack`](./packages/anvilabs-scripts-backpack).

## Usage

The packages hosted in these repo expose binaries called `anvilabs-scripts-x` (e.g. `anvilabs-scripts-node`):

```bash
$ anvilabs-scripts-x [script] [options]
```

You can find all available scripts in the `src/scripts` of the respective package in [packages](./packages/).

### Overriding Config

You can specify your own config for some scripts bundled with a given toolkit. There are various ways that it works, but basically if you want to have your own config for something, just add the config and the toolkit will use that instead of it's own internal config. In addition, all toolkits expose their configs so you can use them and override only the parts of the config you need to.

This can be a very helpful way to make editor integration work for tools like
ESLint which require project-based ESLint configuration to be present to work.

So, if we were to do this for ESLint, you could create an `.eslintrc.js` with the
contents of:

```js
module.exports = {
  extends: 'anvilabs-scripts-node/eslint',
};
```

Or, for `babel`, a `.babelrc` with:

```json
{
  "presets": ["anvilabs-scripts-node/babel"]
}
```

Or, for `jest`, a `jest.config.js` with:

```js
module.exports = {
  ...require('anvilabs-scripts-node/jest'),
  // your overrides
});
```

Or, for `tsc`, a `tsconfig.json` with:

```json
{
  "extends": "./node_modules/anvilabs-scripts-node/tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./"
  },
  "include": ["*/*.json", "src/**/*.js", "src/**/*.ts", "typings/**/*.d.ts"],
  "exclude": ["node_modules", "src/**/__tests__"]
}
```

Or, for `tslint`, a `tslint.json` with:

```json
{
  "extends": "anvilabs-scripts-node/tslint.json"
}
```

Or, for `backpack`, a `backpack.config.js` with:

```js
module.exports = {
  webpack: (config, options, webpack) => ({
    ...require('anvilabs-scripts-backpack/backpack').webpack(config),
    // your overrides
  }),
};
```

## Credits

Inspired by:

* [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts)
* [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)
* [d-scripts](https://github.com/trae/d-scripts)

## License

[MIT License](./LICENSE) © Anvilabs LLC
