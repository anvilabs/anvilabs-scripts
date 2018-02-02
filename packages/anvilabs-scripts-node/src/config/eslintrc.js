module.exports = {
  extends: ['@anvilabs/eslint-config', '@anvilabs/eslint-config/babel-module'],
  rules: {
    'no-process-env': 'error',
  },
  // TODO: add overrides once https://github.com/eslint/eslint/pull/9748 lands
};
