/* eslint-disable @typescript-eslint/no-var-requires*/
const path = require('path');
const CracoLessPlugin = require('craco-less');

const theme = require(path.resolve(__dirname, 'src/styles/theme.js'));

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: theme,
          },
        },
      },
    },
  ],
};
