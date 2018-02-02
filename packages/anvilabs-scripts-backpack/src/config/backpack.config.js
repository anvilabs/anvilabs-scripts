const {resolveFromRoot} = require('anvilabs-scripts-core/utils');

module.exports = {
  webpack: config => ({
    ...config,
    entry: {
      main: resolveFromRoot('src/index.ts'),
    },
    resolve: {
      ...config.resolve,
      extensions: ['.js', '.ts', '.json'],
    },
    devtool: 'source-map',
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /.ts$/,
          include: resolveFromRoot('src'),
          use: [
            {
              loader: require.resolve('cache-loader'),
              options: {
                cacheDirectory: resolveFromRoot('.cache-loader'),
              },
            },
            {
              loader: require.resolve('awesome-typescript-loader'),
              options: {
                silent: true,
                useTranspileModule: true,
                transpileOnly: true,
                useBabel: true,
                useCache: false,
                compilerOptions: {
                  isolatedModules: true,
                },
              },
            },
          ],
        },
      ],
    },
  }),
};
