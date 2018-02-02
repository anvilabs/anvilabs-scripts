module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: false,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: ['*.js', '.*.js'],
      options: {
        trailingComma: 'es5',
      },
    },
  ],
};
