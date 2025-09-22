const CssModulesPlugin = require('craco-css-modules')

module.exports = {
  plugins: [
    {
      plugin: CssModulesPlugin,
      options: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        filetypes: {
          '.css': {
            syntax: 'postcss',
          },
        },
      },
    },
  ],
}
